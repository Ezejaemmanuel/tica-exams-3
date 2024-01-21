import { $Enums, User } from "@prisma/client";
import { kv } from "@vercel/kv";
import { safeKVOperation } from "../safeKvOperation";
import { prisma } from "@/lib/db";
export async function getUserData(userId: string): Promise<User | null> {
    const cacheKey = `tica:user:${userId}`;
    console.log('Attempting to retrieve user from cache with key:', cacheKey);
    let user: User | null = await safeKVOperation(() => kv.get<User>(cacheKey));

    if (!user) {
        console.log('User not found in cache, fetching from database for userId:', userId);
        user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            console.log('User fetched from database:', user);
            // Cache the user data for 24 hours if fetched from the database
            await safeKVOperation(() => kv.set(cacheKey, user, { ex: 60 * 60 * 24 }));
            console.log('User data cached for 24 hours with key:', cacheKey);
        } else {
            console.log('User not found in database for userId:', userId);
        }
    } else {
        console.log('User retrieved from cache:', user);
    }

    return user;
}
export async function deleteUserFromCache(userId: string): Promise<void> {
    const cacheKey = `tica:user:${userId}`;
    console.log('Attempting to delete user from cache with key:', cacheKey);
    await safeKVOperation(() => kv.del(cacheKey));
    console.log('User deleted from cache with key:', cacheKey);
}

export async function getUserRoleFromCacheOrPrisma(userId: string): Promise<$Enums.Role> {
    const cacheKey = `tica:userRole:${userId}`;
    //console.log("Cache Key created", cacheKey);
    const cachedUser = await safeKVOperation(() => kv.get<$Enums.Role>(cacheKey))
    //console.log("Cached User fetched", cachedUser);

    if (cachedUser) {
        //console.log("Cached User found and returned");
        return cachedUser;
    }

    //console.log("Cached User not found, fetching from DB");
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            role: true,
        },
    });
    //console.log("User fetched from DB: ", user);

    if (!user) {
        //console.log("User not found in DB, throwing an error");
        throw new Error('User not found');
    }

    //console.log("Setting User in cache and saving cache key");
    await safeKVOperation(() => kv.set(cacheKey, user.role, { ex: 60 * 60 * 24 }))// Cache for 24 hours

    //console.log("User set in cache and cache key saved");

    //console.log("Exiting getUserDetailsFromCacheOrPrisma function returning user");
    return user.role;
}