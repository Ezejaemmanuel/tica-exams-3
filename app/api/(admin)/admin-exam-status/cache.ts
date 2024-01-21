// lib/cacheHandlers.ts

import { kv } from '@vercel/kv';
import { safeKVOperation } from '../../safeKvOperation';
import { ExamStatus } from './route';

export async function getExamStatusCache(cacheKey: string): Promise<ExamStatus[] | null> {
    return safeKVOperation(() => kv.get(cacheKey));
}

export const setExamStatusCache = async (cacheKey: string, data: any) => {
    return safeKVOperation(() => kv.set(cacheKey, data, { ex: 60 * 60 * 24 }));
};

export const deleteExamStatusCache = async (cacheKey: string) => {
    return safeKVOperation(() => kv.del(cacheKey));
};
