// // hooks/useUserInfo.ts
// import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
// import { addBaseURL } from '../addBaseUrl';
// import { User } from '@prisma/client';

// // Define the User interface based on your Prisma model


// async function fetchAdminOneExamStatus(): Promise<User | null> {
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
//         queryFn: fetchAdminOneExamStatus,
//         staleTime: 1000 * 60 * 60 * 24, // 24 hours
//     });
// }


// hooks/useUserInfo.ts
import { QueryKey, useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { Exam, User } from '@prisma/client';

async function fetchAdminOneExamStatus({ queryKey }: { queryKey: QueryKey }): Promise<Exam | null> {
    const examId = queryKey[1];
    const url = addBaseURL(`api/admin-one-exam-status?examId=${examId}`);
    const res = await fetch(url);
    if (!res.ok) {
        const errorData = await res.json();
        console.log("error:", errorData);
        throw new Error(errorData);
    }
    const newUser = await res.json();
    console.log("this is it :", newUser);
    return newUser;

}

export function useAdminOneExamStatus(examId: string | null): UseSuspenseQueryResult<Exam, null> {
    if (!examId) throw new Error("userId is not provided");
    return useSuspenseQuery({
        queryKey: ['admin-one-exam-status', examId],
        queryFn: fetchAdminOneExamStatus,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
