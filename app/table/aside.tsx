import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file is configured with Tailwind CSS

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    OnChangeFn,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {
    keepPreviousData,
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';

import { fetchData, Person, PersonApiResponse } from './makeData';

const fetchSize = 50;

function App() {
    console.log('App component rendered');
    const tableContainerRef = React.useRef<HTMLDivElement>(null);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ID</span>,
                size: 60,
            },
            {
                accessorKey: 'firstName',
                header: () => <span>First Name</span>,
            },
            {
                accessorKey: 'lastName',
                header: () => <span>Last Name</span>,
            },
            {
                accessorKey: 'age',
                header: () => <span>Age</span>,
                size: 50,
            },
            {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                size: 50,
            },
            {
                accessorKey: 'status',
                header: () => <span>Status</span>,
            },
            {
                accessorKey: 'progress',
                header: () => <span>Profile Progress</span>,
                size: 80,
            },
            {
                accessorKey: 'createdAt',
                header: () => <span>Created At</span>,
                cell: info => info.getValue<Date>().toLocaleString(),
                size: 200,
            },
        ],
        []
    );


    const {
        data,
        fetchNextPage,
        isError,
        isFetching,
        isLoading,
    } = useInfiniteQuery<PersonApiResponse>({
        queryKey: ['people', sorting],
        queryFn: async ({ pageParam = 0 }) => {
            console.log('Query function called with pageParam:', pageParam);
            const start = (pageParam as number) * fetchSize;
            const fetchedData = await fetchData(start, fetchSize, sorting);
            console.log('Data received from fetch:', fetchedData);
            return fetchedData;
        },
        getNextPageParam: (lastPage, allPages) => allPages.length,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        initialPageParam: 0, // Add this line
    });

    const flatData = React.useMemo(
        () => data?.pages.flatMap(page => page.data) ?? [],
        [data?.pages]
    );

    const table = useReactTable({
        data: flatData,
        columns,
        state: {
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: true,
        debugTable: true,
    });

    console.log('React Table instance:', table);

    const handleSortingChange: OnChangeFn<SortingState> = React.useCallback(
        (updater) => {
            console.log('Sorting changed:', updater);
            setSorting(updater);
        },
        []
    );

    table.setOptions((prev) => ({
        ...prev,
        onSortingChange: handleSortingChange,
    }));

    const rowVirtualizer = useVirtualizer({
        count: flatData.length,
        getScrollElement: () => tableContainerRef.current,
        estimateSize: () => 35,
        overscan: 5,
    });

    React.useEffect(() => {
        const container = tableContainerRef.current;
        if (container) {
            const handleScroll = () => {
                const { scrollHeight, scrollTop, clientHeight } = container;
                const nearBottom = scrollHeight - scrollTop <= clientHeight * 1.5;
                if (nearBottom && !isFetching && flatData.length < (data?.pages[0]?.meta.totalRowCount ?? 0)) {
                    console.log('Fetching next page');
                    fetchNextPage();
                }
            };

            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [fetchNextPage, isFetching, flatData.length, data?.pages]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="app">
            <div
                ref={tableContainerRef}
                className="container mx-auto overflow-auto relative h-96"
            >
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        style={{ width: header.getSize() }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() === 'desc' ? (
                                                <span className="ml-2">🔽</span>
                                            ) : (
                                                <span className="ml-2">🔼</span>
                                            )
                                        ) : null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rowVirtualizer.getVirtualItems().map(virtualRow => {
                            const row = table.getRowModel().rows[virtualRow.index];
                            return (
                                <tr key={row.id} style={{ transform: `translateY(${virtualRow.start}px)` }}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 whitespace-nowrap"
                                            style={{ width: cell.column.getSize() }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isFetching && <div>Fetching more...</div>}
        </div>
    );
}
