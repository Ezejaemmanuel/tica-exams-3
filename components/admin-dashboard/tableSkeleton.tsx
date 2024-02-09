import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface TableSkeletonProps {
    rows: number;
    columns: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows, columns }) => {
    return (
        <div className="space-y-2  dark:bg-black bg-white">
            {/* Skeleton for the select form */}
            <div className="w-full ">
                <Skeleton className="h-10 rounded-md" />
            </div>
            {/* Skeleton for the table */}
            <div className=" rounded-lg shadow">
                <table className="min-w-full ">
                    <thead>
                        <tr>
                            {Array.from({ length: columns }, (_, index) => (
                                <th key={index} className="px-6 py-3 ">
                                    <Skeleton className="h-4 rounded" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="  ">
                        {Array.from({ length: rows }, (_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: columns }, (_, columnIndex) => (
                                    <td key={columnIndex} className="px-6 py-4">
                                        <Skeleton className="h-4 rounded" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableSkeleton;
