// lib/statusTypes.ts

// Extend the StatusType enum to include user-specific status types
export enum StatusType {
    NewPayments = 'newPayments',
    NewUsers = 'newUsers',
    NewExams = 'newExams', // This will be user-specific
}

// Enum for the boolean status values
export enum StatusValue {
    True = 'true',
    False = 'false',
}

// lib/setStatus.ts

import { kv } from '@vercel/kv';

// Function to set the status, with an optional userId parameter for user-specific statuses
export async function setGenericStatus(type: StatusType, value: StatusValue, userId?: string): Promise<void> {
    // Construct the cache key, including the userId if provided
    const cacheKey = userId ? `tica:status:${type}:${userId}` : `tica:status:${type}`;
    try {
        await kv.set(cacheKey, value);
        console.log(`Status for ${type}${userId ? ' for user ' + userId : ''} set to ${value}`);
    } catch (error) {
        console.error(`Error setting status for ${type}${userId ? ' for user ' + userId : ''}:`, error);
        throw new Error('Failed to set status');
    }
}

// lib/getStatus.ts

// Function to get the status, with an optional userId parameter for user-specific statuses
// Assuming kv is imported and properly configured

export async function getGenericStatus(type: StatusType, userId?: string): Promise<StatusValue> {
    // Construct the cache key, including the userId if provided
    const cacheKey = userId ? `tica:status:${type}:${userId}` : `tica:status:${type}`;
    try {
        const value = await kv.get<StatusValue>(cacheKey);
        console.log(`Status for ${type}${userId ? ' for user ' + userId : ''} is ${value}`);
        // If the status is not found, return 'false' instead of 'null'
        return value ?? StatusValue.False;
    } catch (error) {
        console.error(`Error getting status for ${type}${userId ? ' for user ' + userId : ''}:`, error);
        // If there's an error, return 'false'
        return StatusValue.False;
    }
}
