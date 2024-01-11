// hooks/useUserRegistered.ts
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { toast } from 'sonner';

async function fetchUserRegistered(): Promise<boolean> {
    const url = addBaseURL("api/register")
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data.message === 'true';
}

export function useUserRegistered(): UseSuspenseQueryResult<boolean, Error> {
    return useSuspenseQuery({
        queryKey: ['userRegistered'],
        queryFn: fetchUserRegistered,
        staleTime: 1000 * 60 * 60 * 24,
        // 24 hours

    });
}
