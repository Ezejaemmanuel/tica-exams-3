// hooks/useUserRegistered.ts
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { toast } from 'sonner';

// hooks/useUserRegistered.ts

async function fetchUserRegistered(): Promise<boolean> {
    const url = addBaseURL("api/register");
    console.log("this is the url ", url);
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await res.json();
    return data;
}

// ... (rest of the code)


export function useUserRegistered(): UseSuspenseQueryResult<boolean, Error> {
    return useSuspenseQuery({
        queryKey: ['userRegistered'],
        queryFn: fetchUserRegistered,
        staleTime: 1000 * 60 * 60 * 24,
        // 24 hours

    });
}
