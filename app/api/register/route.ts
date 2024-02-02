// pages/api/register.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth/utils';

import { kv } from "@vercel/kv"
import { safeKVOperation } from '../../../lib/api/redis/safeKvOperation';
import { setRegistrationStatus, RegistrationStatus } from '@/lib/api/redis/registeration-status';
import { FormSchema } from '@/components/register/NewMainForm';

export async function POST(request: NextRequest) {
    const userId = getUserId();

    if (!userId) {
        return NextResponse.json({ error: 'User is not authenticated.' }, { status: 401 });
    }
    const formData: FormSchema = await request.json();
    console.log("see the data that is coming from the frontend ", formData);
    const [classLevel_, month, year, uniqueId] = formData.examId.split('-');
    console.log("this is the classlevel", classLevel_);
    const lowerClassLevel = classLevel_.toLowerCase();
    console.log("this is the lower classllevel", lowerClassLevel);
    // Convert class to lowercase and map to ClassLevel enum
    const classLevel = lowerClassLevel === 'jss1' ? 'JSS1' : lowerClassLevel === 'ss1' ? 'SS1' : lowerClassLevel === 'jss2' ? 'JSS2' : null;
    if (!classLevel) {
        return NextResponse.json({ error: 'Invalid class level.' }, { status: 400 });
    }

    try {
        const user = await prisma.userAuth.findUnique(
            { where: { id: userId } }
        )
        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }
        // Start a transaction to ensure atomicity
        const result = await prisma.$transaction(async (prisma) => {
            // Create the new user with all fields and mapped classLevel
            // const newUser = await prisma.user.create({
            //     data: {
            //         id: userId,
            //         officialEmail: formData.email,
            //         name: formData.name,
            //         class: classLevel_,
            //         dob: new Date(formData.dob),
            //         classLevel: classLevel, // Use the mapped classLevel
            //         officialPhoneOrWhatsappNumber: formData.phoneNumber,
            //         fullAddress: formData.address,
            //         locality: formData.locality,
            //         city: formData.city,
            //         state: formData.state,
            //         country: formData.country,
            //         homeAddress: formData.address,
            //         // Add any other fields that are required by the User model
            //         userAuthId: userId,
            //     },
            // });
            const dateOfBirth = new Date(formData.dateOfBirth);
            const dateOfBaptism = formData.dateOfBaptism ? new Date(formData.dateOfBaptism) : null;
            const dateOfHolyCommunion = formData.dateOfHolyCommunion ? new Date(formData.dateOfHolyCommunion) : null;
            const dateOfHolyConfirmation = formData.dateOfHolyConfirmation ? new Date(formData.dateOfHolyConfirmation) : null;

            // Assuming the session or authentication logic to retrieve userId is handled elsewhere

            // Insert the data into the database
            const newUser = await prisma.user.create({
                data: {
                    id: userId, // Assuming this is a new ID generated for the user, or use an existing ID as needed
                    name: formData.candidatesFullName,
                    presentClass: formData.presentClass,
                    class: classLevel_,
                    dateOfBirth: dateOfBirth,
                    officialPhoneOrWhatsappNumber: formData.phoneNumber,
                    fullAddress: formData.residentialAddress,
                    state: formData.stateOfOrigin,
                    homeAddress: formData.homeTown,
                    classLevel: classLevel, // Placeholder: Map formData to your ClassLevel enum as needed
                    dateOfBaptism: dateOfBaptism,
                    dateOfHolyCommunion: dateOfHolyCommunion,
                    dateOfHolyConfirmation: dateOfHolyConfirmation,
                    presentSchool: formData.presentSchool,
                    finishedPrimary: formData.finishedPrimary,
                    massServer: formData.massServer,
                    piousSociety: formData.piousSociety,
                    examId: formData.examId,
                    fathersName: formData.fathersName,
                    mothersName: formData.mothersName,
                    localGovernmentArea: formData.localGovernmentArea,
                    parentDeceased: formData.parentDeceased,
                    catholic: formData.catholic,
                    denomination: formData.denomination,
                    supportsEntry: formData.supportsEntry,
                    canSponsor: formData.canSponsor,
                    candidateProfile: formData.candidateProfile,
                    userAuthId: userId, // Link to the authenticated user's ID
                    // Add any additional fields from formData as needed
                },
            });

            // Create a payment confirmation for the user
            const paymentConfirmation = await prisma.paymentConfirmation.create({
                data: {
                    userId: userId, // The ID of the user for whom the payment confirmation is being created
                    examId: formData.examId, // The ID of the exam associated with the payment
                    // Set any other fields that are required and do not have default values
                },
            });
            await setRegistrationStatus(userId, RegistrationStatus.Registered);

            return { newUser, paymentConfirmation };
        });

        // Update the registration status in Redis

        return NextResponse.json({ message: "Registration successful" }, { status: 200 });

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


