import { UsersResponse } from '@/app/api/(admin)/users-table/route';
import { QueryKey, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { addBaseURL } from '../addBaseUrl';
import { PaymentFilter } from '@/components/admin-dashboard/admin-dashboard';

// Define the query function outside of the hook to avoid recreating the function on every render
const fetchUsers = async ({ queryKey }: { queryKey: QueryKey }): Promise<UsersResponse> => {
    const [_key, page, sort, order, search, paymentFilter] = queryKey;
    const url = addBaseURL(`api/users-table?page=${page}&sort=${sort}&order=${order}&search=${search}&paymentFilter=${paymentFilter}`);
    console.log("this is the url", url);
    const response = await fetch(url);
    if (!response.ok) {
        const dataError = await response.json();
        console.log("this is the error in the use user", dataError);
        throw new Error(dataError);
    }
    const data = await response.json();
    console.log("this is the data that is returned by the useUsers", data);
    return data;
};

export function useUsers(page: number, sort: string, order: string, search: string, paymentFilter: PaymentFilter) {
    const debouncedSearch = useDebounce(search, 2000);

    return useSuspenseQuery<UsersResponse, Error>({
        queryKey: ['users-table', page, sort, order, debouncedSearch, paymentFilter],
        queryFn: fetchUsers,
        staleTime: 60 * 60 * 1000 * 10,
        // 1 hour
        // keepPreviousData: true, // Uncomment if you want to keep the previous data while new data is being fetched
        // You can add more options here, such as `retry`, `onSuccess`, etc.
    });
}
