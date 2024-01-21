// pages/api/register.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth/utils';
import { FormData } from '@/components/register/mainForm';

import { kv } from "@vercel/kv"
import { safeKVOperation } from '../safeKvOperation';

export async function POST(request: NextRequest) {
    const userId = getUserId();

    if (!userId) {
        return NextResponse.json({ error: 'User is not authenticated.' }, { status: 401 });
    }
    const formData: FormData = await request.json();
    console.log("see the data that is coming from the frontend ", formData);

    // Convert class to lowercase and map to ClassLevel enum
    const classLevel = formData.class.toLowerCase() === 'jss1' ? 'JSS1' : formData.class.toLowerCase() === 'ss1' ? 'SS1' : null;
    if (!classLevel) {
        return NextResponse.json({ error: 'Invalid class level.' }, { status: 400 });
    }

    try {
        // Check if a user with the same userAuthId already exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                // other fields you want to select
            }
        });
        const existingUserAuth = await prisma.userAuth.findUnique({
            where: { id: userId },
            select: {
                id: true,
                // other fields you want to select
            }
        });
        if (!existingUserAuth) {
            return NextResponse.json({ error: "User has not signed in" }, { status: 404 });
        }
        if (existingUser) {
            // Return an error if the user already exists
            return NextResponse.json({ error: 'User has already been registered. Go to the dashboard to update your registration values' }, { status: 409 });
        }

        // Create the new user with all fields and mapped classLevel
        const newUser = await prisma.user.create({
            data: {
                id: userId,
                officialEmail: formData.email,
                name: formData.name,
                class: formData.class,
                dob: new Date(formData.dob),
                classLevel: classLevel, // Use the mapped classLevel
                officialPhoneOrWhatsappNumber: formData.phoneNumber,
                fullAddress: formData.address,
                locality: formData.locality,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                homeAddress: formData.address,
                // Add any other fields that are required by the User model
                userAuthId: userId,
            },
        });
        const newUserExam = await prisma.userExam.create({
            data: {
                id: userId, // Generate a unique ID for the UserExam
                userId: newUser.id, // Set the userId to the ID of the newly created user
                examId: 'jss1-1-2024', // Set the examId to 'jss1-1-2024'
                // You can set other fields as needed

            },
        });
        const yes = await safeKVOperation(() => kv.set(`isRegistered:${userId}`, true))


        return NextResponse.json({ message: "registeration succesfully 0000000" }, { status: 200 });

    } catch (error) {
        console.error('Request error', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            // If it's not an Error instance, you might want to handle it differently
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}


// pages/api/register.ts


// export async function GET(req: NextRequest) {
//     console.log('Received a request to check user registration status.');

//     const userId = getUserId();
//     console.log('Retrieved userId:', userId);

//     if (!userId) {
//         console.log('No userId found, returning false.');
//         return NextResponse.json({ message: 'false' }, { status: 200 });
//     }

//     try {
//         console.log('Looking up UserAuth with userId:', userId);
//         const userAuth = await prisma.userAuth.findUnique({
//             where: { id: userId },
//             select: { id: true },
//         });
//         console.log('UserAuth result:', userAuth);

//         // if (!userAuth) {
//         //     console.log('UserAuth not found, returning false.');
//         //     return NextResponse.json({ message: 'false' }, { status: 200 });
//         // }

//         console.log('Looking up User with userId:', userId);
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//         });
//         console.log('User result:', user);

//         if (!user) {
//             console.log('User not found, returning false.');
//             return NextResponse.json({ message: 'false' }, { status: 200 });
//         }

//         console.log('Checking if all user fields are not null.');
//         // const userFieldsAreNotNull = Object.values(user).some(field => !field);
//         // console.log('Are all user fields not null?', userFieldsAreNotNull);

//         // if (!user.city || !user.officialEmail || !user.id || !user.name) {
//         //     console.log('One or more user fields are null, returning false.');
//         //     return NextResponse.json({ message: 'false' }, { status: 200 });
//         // }

//         console.log('User is fully registered, returning true.');
//         return NextResponse.json({ message: 'true' }, { status: 200 });
//     } catch (error) {
//         console.error('Request error', error);
//         return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//     }
// }

// pages/api/register.ts

// ... (other imports)

// ... (other code)

export async function GET(req: NextRequest) {
    const userId = getUserId();

    if (!userId) {
        return NextResponse.json(false, { status: 200 });
    }

    try {
        // Check the KV store for the user's registration status
        const isRegistered = await kv.get(`isRegistered:${userId}`);

        // Return true or false based on the KV value
        return NextResponse.json(isRegistered || false, { status: 200 });
    } catch (error) {
        console.error('Request error', error);
        return NextResponse.json(false, { status: 500 });
    }
}


