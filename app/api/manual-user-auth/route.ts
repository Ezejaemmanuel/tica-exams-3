// pages/api/create-user-auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Replace with your actual Prisma client import
import { currentUser } from '@clerk/nextjs';

// This function should be implemented to retrieve the current user session
// and return an instance of the User class.


export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'No active session found' }, { status: 401 });
        }

        // Create or update the user auth in your database
        const userAuth = await prisma.userAuth.upsert({
            where: { id: user.id },
            create: {
                id: user.id,
                firstName: user.firstName || "jatique",
                lastName: user.lastName || "emmanuel ooo",
                username: user.username,
                email: user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress || '',
                imageUrl: user.imageUrl,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt),
                banned: user.banned, // Assuming 'banned' is a boolean and default is false
                emailAddresses: JSON.stringify(user.emailAddresses),
                phoneNumbers: JSON.stringify(user.phoneNumbers), // Assuming 'phoneNumbers' is an array, provide the actual value
                userId: user.id, // Assuming 'userId' is a string, provide the actual value
                primaryEmailAddressId: user.primaryEmailAddressId,
                // Add other fields as necessary from the User object
            },
            update: {
                firstName: user.firstName || "jatique",
                lastName: user.lastName || "emmanuel ooo",
                username: user.username,
                email: user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress || '',
                imageUrl: user.imageUrl,
                updatedAt: new Date(),
                // Update other fields as necessary from the User object
            },
        });

        // Respond with the created or updated user auth
        return NextResponse.json(userAuth, { status: 200 });
    } catch (error) {
        console.error('Failed to create user auth:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
export const dynamic = "force-dynamic"