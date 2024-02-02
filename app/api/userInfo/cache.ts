import { $Enums } from "@prisma/client";
import { kv } from "@vercel/kv";
import { safeKVOperation } from "../../../lib/api/redis/safeKvOperation";
import { prisma } from "@/lib/db";
import { Prisma, User, PaymentConfirmation, UserExam, Exam, Result } from "@prisma/client";
// Define a type that extends the User type with additional fields for paymentConfirmation and userExams

// Adjust the type to match the structure returned by the Prisma query
export type ExtendedUserData = User & {
    paymentConfirmation?: PaymentConfirmation | null;
    userExam: (UserExam & {
        exam: Exam;
        result?: Result | null;
    })[];
};

export async function getUserData(userId: string): Promise<ExtendedUserData | null> {
    // const cacheKey = `tica:user:${userId}`;
    // console.log('Attempting to retrieve user from cache with key:', cacheKey);
    // let user: ExtendedUserData | null = await safeKVOperation(() => kv.get<ExtendedUserData>(cacheKey));

    // if (!user) {
    // console.log('User not found in cache, fetching from database for userId:', userId);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            paymentConfirmation: true,
            userExam: {
                include: {
                    exam: true,
                    result: true,
                }
            }
        }
    });

    // if (user) {
    // console.log('User fetched from database:', user);
    // Cache the user data for 24 hours if fetched from the database
    // await safeKVOperation(() => kv.set(cacheKey, user));
    // console.log('User data cached for 24 hours with key:', cacheKey);
    // } else {
    // console.log('User not found in database for userId:', userId);
    // return null;
    // }
    // } else {
    // console.log('User retrieved from cache:', user);
    // }

    return user;
}


// export async function deleteUserFromCache(userId: string): Promise<void> {
//     const cacheKey = `tica:user:${userId}`;
//     console.log('Attempting to delete user from cache with key:', cacheKey);
//     await safeKVOperation(() => kv.del(cacheKey));
//     console.log('User deleted from cache with key:', cacheKey);
// }

export async function getUserRoleFromCacheOrPrisma(userId: string): Promise<$Enums.Role | null> {
    const cacheKey = `tica:userRole:${userId}`;
    //console.log("Cache Key created", cacheKey);
    const cachedUser = await safeKVOperation(() => kv.get<$Enums.Role>(cacheKey))
    //console.log("Cached User fetched", cachedUser);

    if (cachedUser) {
        //console.log("Cached User found and returned");
        return cachedUser;
    }

    //console.log("Cached User not found, fetching from DB");
    const user = await prisma.userAuth.findUnique({
        where: { id: userId },
        select: {
            role: true,
        },
    });
    //console.log("User fetched from DB: ", user);

    if (!user) {
        //console.log("User not found in DB, throwing an error");
        // throw new Error('User not found');
        console.log("there is no user role in cache");
        return null;
    }

    //console.log("Setting User in cache and saving cache key");
    await safeKVOperation(() => kv.set(cacheKey, user.role))// Cache for 24 hours

    //console.log("User set in cache and cache key saved");

    //console.log("Exiting getUserDetailsFromCacheOrPrisma function returning user");
    return user.role;
}