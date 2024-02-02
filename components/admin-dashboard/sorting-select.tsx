import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Define the enum for sorting options
export enum SortOption {
    NameAsc = 'name-asc',
    NameDesc = 'name-desc',
    RoleAsc = 'role-asc',
    RoleDesc = 'role-desc',
    TotalScoreAsc = 'totalScore-asc',
    TotalScoreDesc = 'totalScore-desc',
    // Add other sort options as needed
}

// Define the props with TypeScript
interface SortingSelectProps {
    setSort: (sortField: string) => void;
    setOrder: (sortOrder: string) => void;
}

const SortingSelect: React.FC<SortingSelectProps> = ({ setSort, setOrder }) => {
    const handleSortChange = (value: string) => {
        const [sortField, sortOrder] = value.split('-');
        setSort(sortField);
        setOrder(sortOrder);
    };

    return (
        <Select onValueChange={handleSortChange}>
            <SelectTrigger>
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={SortOption.NameAsc}>Name (Ascending)</SelectItem>
                <SelectItem value={SortOption.NameDesc}>Name (Descending)</SelectItem>
                <SelectItem value={SortOption.RoleAsc}>Role (Ascending)</SelectItem>
                <SelectItem value={SortOption.RoleDesc}>Role (Descending)</SelectItem>
                <SelectItem value={SortOption.TotalScoreAsc}>Total Score (Ascending)</SelectItem>
                <SelectItem value={SortOption.TotalScoreDesc}>Total Score (Descending)</SelectItem>
                {/* Add other fields as needed */}
            </SelectContent>
        </Select>
    );
};

export default SortingSelect;
