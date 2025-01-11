import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

const SortProducts = ({onSortChange}) => {

    const list = [
        {
            label: 'NEWEST',
            field: 'id',
            order: 'desc'
        },
        {
            label: 'PRICE (Low to High)',
            field: 'price',
            order: 'asc'
        },
        {
            label: 'PRICE (High to Low)',
            field: 'price',
            order: 'asc'
        },
        {
            label: 'Most Viewed',
            field: 'price',
            order: 'asc'
        },
    ]

    return (
        <div>
            <Select onValueChange={(value) => onSortChange(value)} >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    {list.map((option, index) => (
                        <SelectItem key={index} value={option}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortProducts