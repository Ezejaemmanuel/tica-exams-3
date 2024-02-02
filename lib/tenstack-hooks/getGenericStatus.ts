// // hooks/useStatusQuery.ts
// import { QueryKey, useSuspenseQuery } from '@tanstack/react-query';
// import { StatusType, StatusValue } from '../api/redis/genericStatus';
// import { addBaseURL } from '../addBaseUrl';

// // Define the type for the error
// interface StatusQueryError {
//     error: string;
// }

// // Define the type for the response
// interface StatusQueryResponse {
//     status: StatusValue;
// }

// // Fetch function for the status data
// async function fetchStatusData({ queryKey }: { queryKey: QueryKey }): Promise<StatusQueryResponse> {
//     console.log('Fetching status data...');
//     const [, statusType, userId] = queryKey as [string, StatusType, string | undefined];
//     console.log(`Status type: ${statusType}, User ID: ${userId}`);

//     const searchParams = new URLSearchParams({ status: statusType });
//     if (userId && userId !== "not-found") searchParams.append('userId', userId);

//     console.log(`Constructed search params: ${searchParams}`);
//     const url = addBaseURL(`api/getGenericStatus?${searchParams}`)
//     const response = await fetch(url);

//     if (!response.ok) {
//         console.log('Response not OK, parsing error data...');
//         const errorData: StatusQueryError = await response.json();
//         console.error('Error fetching status data:', errorData);
//         throw new Error(errorData.error);
//     }

//     console.log('Parsing response data...');
//     const data: StatusQueryResponse = await response.json();
//     console.log('Fetched status data:', data);
//     return data;
// }

// // React Query hook
// export function useStatusQuery(statusType: StatusType, userId?: string) {
//     console.log('Using status query hook...');
//     if (!userId) userId = "not-found"
//     console.log("this is the userId");
//     return useSuspenseQuery<StatusQueryResponse, StatusQueryError>({
//         queryKey: ['generic-status', statusType, userId],
//         queryFn: fetchStatusData,
//         staleTime: 1000 * 60 * 60 * 24, // 24 hours
//         // If you want to use suspense, you need to set the suspense option to true
//         // and ensure your React version and setup support suspense for data fetching
//     });
// }
