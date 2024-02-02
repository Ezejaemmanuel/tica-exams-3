// pages/api/getStatus.ts
import { StatusType, getGenericStatus, StatusValue } from '@/lib/api/redis/genericStatus';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('Received request for status');
    const searchParams = new URL(request.url).searchParams;
    const statusType = searchParams.get('status') as StatusType | null;
    const userId = searchParams.get('userId') || undefined;

    console.log(`Status type from search params: ${statusType}`);
    console.log(`User ID from search params: ${userId}`);

    // Validate the status type
    if (!statusType || !Object.values(StatusType).includes(statusType)) {
        console.log('Invalid or missing status type');
        return NextResponse.json({ error: 'Invalid or missing status type' }, { status: 400 });
    }

    try {
        console.log(`Retrieving status for type: ${statusType} and user ID: ${userId}`);
        const statusValue = await getGenericStatus(statusType, userId);

        console.log(`Status for ${statusType}: ${statusValue}`);
        // Return the status value, which will be 'false' if not found
        return NextResponse.json({ status: statusValue });
    } catch (error) {
        console.error(`Error retrieving status for ${statusType}:`, error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

