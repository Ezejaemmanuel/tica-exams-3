import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { EmailAddressJSON, UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { UserAuthCreateInput, UserAuthUpdateInput } from './type';
import { prisma } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
// export async function POST(req: Request) {

//     // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//     const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

//     if (!WEBHOOK_SECRET) {
//         throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//     }

//     // Get the headers
//     const headerPayload = headers();
//     const svix_id = headerPayload.get("svix-id");
//     const svix_timestamp = headerPayload.get("svix-timestamp");
//     const svix_signature = headerPayload.get("svix-signature");

//     // If there are no headers, error out
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//         return new Response('Error occured -- no svix headers', {
//             status: 400
//         })
//     }

//     // Get the body
//     const payload = await req.json()
//     const body = JSON.stringify(payload);

//     // Create a new Svix instance with your secret.
//     const wh = new Webhook(WEBHOOK_SECRET);

//     let evt: WebhookEvent

//     // Verify the payload with the headers
//     try {
//         evt = wh.verify(body, {
//             "svix-id": svix_id,
//             "svix-timestamp": svix_timestamp,
//             "svix-signature": svix_signature,
//         }) as WebhookEvent
//     } catch (err) {
//         console.error('Error verifying webhook:', err);
//         return new Response('Error occured', {
//             status: 400
//         })
//     }

//     // Get the ID and type
//     const { id } = evt.data;
//     const eventType = evt.type;

//     switch (eventType) {
//         case 'user.created':
//             console.log('User created event:', evt.data);
//             break;
//         case 'user.updated':
//             console.log('User updated event:', evt.data);
//             break;
//         case 'user.deleted':
//             console.log('User deleted event:', evt.data);
//             break;
//         default:
//             console.log('Unhandled event type:', eventType);
//     }

//     return new Response('yes ooooooo', { status: 200 })
// }




function getPrimaryEmail(emails: EmailAddressJSON[], primaryId: string): string {
    const primaryEmail = emails.find(email => email.id === primaryId);
    return primaryEmail ? primaryEmail.email_address : '';
}

async function createUserAuth(data: UserJSON) {
    const primaryEmail = getPrimaryEmail(data.email_addresses, data.primary_email_address_id);
    const newUserAuth = await prisma.userAuth.create({
        data: {
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            username: data.username,
            primaryEmailAddressId: data.primary_email_address_id,
            primaryPhoneNumberId: data.primary_phone_number_id,
            emailAddresses: JSON.parse(JSON.stringify(data.email_addresses)),
            phoneNumbers: JSON.parse(JSON.stringify(data.phone_numbers)),
            banned: data.banned,
            userId: uuidv4(),
            imageUrl: data.image_url,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            email: primaryEmail,
        },
    });
    return newUserAuth;

}

async function updateUserAuth(data: UserJSON) {
    const primaryEmail = getPrimaryEmail(data.email_addresses, data.primary_email_address_id);
    const updatedUserAuth = await prisma.userAuth.update({
        where: { id: data.id },
        data: {
            firstName: data.first_name,
            lastName: data.last_name,
            username: data.username,
            primaryEmailAddressId: data.primary_email_address_id,
            primaryPhoneNumberId: data.primary_phone_number_id,
            emailAddresses: JSON.parse(JSON.stringify(data.email_addresses)),
            phoneNumbers: JSON.parse(JSON.stringify(data.phone_numbers)),
            banned: data.banned,
            imageUrl: data.image_url,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            email: primaryEmail,
        },
    });
    return updatedUserAuth;
}

async function deleteUserAuth(id: string) {
    const deletedUserAuth = await prisma.userAuth.delete({
        where: { id: id },
    });
    return deletedUserAuth;
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', { status: 400 });
    }

    const eventType = evt.type;

    switch (eventType) {
        case 'user.created':
            const newUserAuth = await createUserAuth(evt.data);
            console.log('User created event:', newUserAuth);
            break;
        case 'user.updated':
            const updatedUserAuth = await updateUserAuth(evt.data);
            console.log('User updated event:', updatedUserAuth);
            break;
        case 'user.deleted':
            if (evt.data.id) {
                const deletedUserAuth = await deleteUserAuth(evt.data.id);
                console.log('User deleted event:', deletedUserAuth);
            } else {
                console.log('Error: User ID is undefined');
            }
            break;
        default:
            console.log('Unhandled event type:', eventType);
    }

    return new Response('yes ooooooo', { status: 200 });
}
