// TanStackTable.tsx
"use client";
import { useMemo, useState } from 'react';
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '../ui/input';
import SortingSelect from './sorting-select';
import { PaymentStatus, User } from '@/app/api/(admin)/users-table/types';
import { useUsers } from '@/lib/tenstack-hooks/admin-user-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge, badgeVariants } from '../ui/badge';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';
import Image from 'next/image';
export enum PaymentFilter {
    All = 'all',
    Confirmed = 'confirmed',
    NotConfirmed = 'notConfirmed',
    NotPayed = 'notPayed',
}


const TanStackTable = () => {
    console.log('Setting up component state...');
    const router = useRouter();
    const [page, setPage] = useState(1);
    console.log('Current page:', page);
    const [sort, setSort] = useState('name');
    console.log('Current sort:', sort);
    const [order, setOrder] = useState('asc');
    console.log('Current order:', order);
    const [search, setSearch] = useState('');
    console.log('Current search:', search);
    const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>(PaymentFilter.All);
    console.log('Fetching user data...');
    const { data, isLoading, isError, error } = useUsers(page, sort, order, search, paymentFilter);

    console.log('User data:', data);
    console.log('Is loading:', isLoading);
    console.log('Is error:', isError);
    console.log('Error:', error);

    console.log('Creating table instance...');
    const columns = useMemo(() => {
        const columnHelper = createColumnHelper<User>();

        return [
            columnHelper.accessor((_row, index) => index + 1, {
                id: 'serial',
                header: () => <span className="text-sm capitalize">S/N</span>,
                cell: (info) => {
                    const value = info.getValue();
                    return <span className=''>{value}</span>;
                },
            }),
            columnHelper.accessor((row) => row.name, {
                id: 'name',
                header: () => <span className="text-xs capitalize">Name</span>,
                cell: (info) => {
                    const value = info.getValue();
                    const userId = info.row.original.id; // Assuming the user ID is stored in `id` property
                    console.log("this is the name of the user: ", value);
                    return (
                        <Link href={`/admin-student-dashboard?userId=${userId}`} passHref className='text-xs   hover:underline'>
                            {value}
                        </Link>
                    );
                },
            }),


            // columnHelper.accessor((row) => row.candidateProfile, {
            //     id: 'candidateProfile',
            //     header: () => <span className="text-sm capitalize">Image</span>,
            //     cell: (info) => {
            //         const value = info.getValue();
            //         return <Image
            //             src={value}
            //             height={10}
            //             width={10}
            //             alt="..."
            //             className="rounded-full w-10 h-10 object-cover"
            //         />
            //     },
            // }),
            columnHelper.accessor((row) => row.class, {
                id: 'class',
                header: () => <span className="text-xs capitalize">Class</span>,
                cell: (info) => {
                    const value = info.getValue();
                    return value ? <Badge className='text-xs'>{value}</Badge> : 'N/A'

                },
            }),
            columnHelper.accessor((row) => row.createdAt, {
                id: 'createdAt',
                header: () => <span className="text-sm capitalize">Registered At</span>,
                cell: (info) => {
                    const dateValue = new Date(info.getValue());
                    return dateValue.toLocaleDateString('en-US');
                },
            }),
            columnHelper.accessor((row) => row.paymentConfirmation?.updatedAt, {
                id: 'paymentConfirmationUpdatedAt',
                header: () => <span className="text-sm capitalize">Made Payment On</span>,
                cell: (info) => {
                    const value = info.getValue();
                    const dateValue = value !== undefined ? new Date(value) : null;
                    return dateValue ? dateValue.toLocaleDateString('en-US') : 'N/A';
                },
            }),
            columnHelper.accessor((row) => row.paymentStatus, {
                id: 'paymentStatus',
                header: () => <span className="text-xs capitalize">Payment Status</span>,
                cell: (info) => {
                    // const router = useRouter(); // Initialize the router
                    const paymentStatus = info.getValue();
                    let bgColor = 'bg-gray-500 rounded-full'; // Default background color
                    let onClickHandler = () => { }; // Default to an empty function

                    if (paymentStatus === PaymentStatus.Confirmed) {
                        bgColor = 'bg-green-500 rounded-full';
                    } else if (paymentStatus === PaymentStatus.NotConfirmed) {
                        bgColor = 'bg-red-500 animate-pulse rounded-full';
                        // Define the click handler for NotConfirmed status
                        // onClickHandler = () => router.push('/admin-dashboard/manual-payment');

                    } else if (paymentStatus === PaymentStatus.NotPayed) {
                        bgColor = 'bg-red-500 rounded-full';
                        // Define the click handler for NotPayed status
                    }

                    return (
                        <Link
                            href={`/admin-dashboard/manual-payment`}
                            className={`${badgeVariants()} ${bgColor} p-1 text-xs rounded cursor-pointer`}
                        >
                            {paymentStatus ?? 'N/A'}
                        </Link>
                    );
                },
            }),
            columnHelper.accessor((row) => row.result?.englishScore, {
                id: 'englishScore',
                header: () => <span className="text-sm capitalize">English</span>,
                cell: (info) => {
                    const value = info.getValue();
                    return value ? <span className='text-sm capitalize'>{value}</span> : 'N/A'
                },
            }),
            columnHelper.accessor((row) => row.result?.mathsScore, {
                id: 'englishScore',
                header: () => <span className="text-sm capitalize">Maths</span>,
                cell: (info) => {
                    const value = info.getValue();
                    return value ? <span className='text-sm capitalize'>{value}</span> : 'N/A'

                },
            }),
            columnHelper.accessor((row) => row.result?.generalStudiesScore, {
                id: 'englishScore',
                header: () => <span className="text-sm capitalize">GS</span>,
                cell: (info) => {
                    const value = info.getValue();
                    return value ? <span className='text-sm capitalize'>{value}</span> : 'N/A'

                },
            }),
            columnHelper.accessor((row) => row.result?.totalScore, {
                id: 'resultTotalScore',
                header: () => <span className="text-xs capitalize">Total Score</span>,
                cell: (info) => info.getValue() ?? '',
            }),
            columnHelper.accessor((row) => row.result?.position, {
                id: 'resultPosition',
                header: () => <span className="text-sm capitalize">Position</span>,
                cell: (info) => info.getValue() ?? 'N/A',
            }),
            columnHelper.accessor((row) => row.result?.passed, {
                id: 'resultPassed',
                header: () => <span className="text-sm capitalize">Passed</span>,
                cell: (info) => {
                    const passed = info.getValue();
                    const bgColor = passed ? 'bg-green-200' : 'bg-red-200';
                    return (
                        <Badge className={`${bgColor} p-1 text-xs rounded`}>
                            {passed ? 'Yes' : 'No'}
                        </Badge>
                    );
                },
            }),
            // Add more columns as needed
        ];
    }, [sort, order, search, paymentFilter]);
    const table = useReactTable({
        data: data?.users || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: data?.totalPages,
    });
    if (data.users.length === 0) {
        return <div>There is no user</div>
    }
    console.log('Table instance created:', table);



    console.log('Rendering table...');
    return (
        <div className="p-6 w-full mx-auto text-gray-700 dark:text-gray-200">
            <div className="flex justify-end items-center mb-4 space-x-2">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-1/4 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded outline-none transition-colors duration-200 ease-in-out"
                />
                <div className="w-1/6">
                    <SortingSelect setSort={setSort} setOrder={setOrder} />
                </div>
                <div className="w-1/6">

                    <Select onValueChange={(value: PaymentFilter) => setPaymentFilter(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={PaymentFilter.All}>All</SelectItem>
                            <SelectItem value={PaymentFilter.Confirmed}>Confirmed</SelectItem>
                            <SelectItem value={PaymentFilter.NotConfirmed}>Not Confirmed</SelectItem>
                            <SelectItem value={PaymentFilter.NotPayed}>Not Payed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>


            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {table.getRowModel().rows.map((row, i) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-end items-center mt-4 space-x-2">
                <div>
                    total of   {data.totalPages}
                </div>
                <button
                    onClick={() => {
                        const newPage = Math.max(page - 1, 1);
                        console.log('Previous page:', newPage);
                        setPage(newPage);
                    }}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm bg-white dark:bg-gray-800 py-2 px-4 rounded">
                    Page {page} of {data?.totalPages}
                </span>
                <button
                    onClick={() => {
                        const newPage = (!data || page >= data.totalPages) ? page : page + 1;
                        console.log('Next page:', newPage);
                        setPage(newPage);
                    }}
                    disabled={!data || page >= data.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

console.log('TanStackTable component defined.');

export default TanStackTable;


