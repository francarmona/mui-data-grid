import { ColumnType } from './column-type';
import { ColumnSortDirection } from './column-sort-direction';

export interface Column {
    field: string;
    title?: string;
    tooltipText?: string;
    type?: ColumnType;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    sortable?: boolean;
    sortDirection?: ColumnSortDirection;
    sortOrder?: number;
    hidden?: boolean;
    render?: (value: any, row?: any) => React.ReactNode;
    detail?: (row: any) => React.ReactNode;
}
