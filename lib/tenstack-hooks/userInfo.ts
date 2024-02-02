// // hooks/useUserInfo.ts
// import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
// import { addBaseURL } from '../addBaseUrl';
// import { User } from '@prisma/client';

// // Define the User interface based on your Prisma model


// async function fetchUserInfo(): Promise<User | null> {
//     const url = addBaseURL('api/userInfo');
//     const res = await fetch(url);
//     if (!res.ok) {
//         const errorData = await res.json();
//         // throw new Error(errorData.error || 'An error occurred while fetching user info');
//         console.log("error:", errorData);
//         return null;
//     }
//     return res.json();
// }

// export function useUserInfo(): UseSuspenseQueryResult<User, null> {
//     return useSuspenseQuery({
//         queryKey: ['userInfo'],
//         queryFn: fetchUserInfo,
//         staleTime: 1000 * 60 * 60 * 24, // 24 hours
//     });
// }


// hooks/useUserInfo.ts
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { User } from '@prisma/client';
import { ExtendedUserData } from '@/app/api/userInfo/cache';

async function fetchUserInfo(): Promise<ExtendedUserData | null> {

    const url = addBaseURL('api/userInfo');
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json();
        console.log("error:", errorData);
        return null;
    }
    const newUser = await res.json();
    return newUser;

}

export function useUserInfo(): UseSuspenseQueryResult<ExtendedUserData, null> {
    return useSuspenseQuery({
        queryKey: ['userInfo'],
        queryFn: fetchUserInfo,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
