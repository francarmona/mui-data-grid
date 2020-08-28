import { ColumnType, Column, ColumnSortDirection } from '../../src/models';

export const mockColumns: Column[] = [
    {
        field: 'a',
        type: ColumnType.String,
        sortable: true,
        sortDirection: ColumnSortDirection.Desc,
        sortOrder: -1,
    },
    {
        field: 'b',
        type: ColumnType.String,
        sortable: true,
        sortDirection: ColumnSortDirection.Desc,
        sortOrder: 2,
    },
    {
        field: 'c',
        type: ColumnType.String,
        sortable: true,
        sortDirection: ColumnSortDirection.Desc,
        sortOrder: -1,
    },
    {
        field: 'd',
        type: ColumnType.String,
        sortable: true,
        sortDirection: ColumnSortDirection.Asc,
        sortOrder: 4,
    },
    {
        field: 'e',
        type: ColumnType.String,
        sortable: true,
        sortDirection: ColumnSortDirection.Asc,
        sortOrder: 3,
    },
    {
        field: 'f',
        type: ColumnType.String,
        sortable: true,
        sortDirection: ColumnSortDirection.Desc,
        sortOrder: Number.MAX_VALUE,
    },
];
