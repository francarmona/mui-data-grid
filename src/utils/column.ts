import { ColumnSortDirection, Column, ColumnType } from '../models';

export const toogleSortDirection = (column: Column): ColumnSortDirection => {
    if (!column.sortDirection || column.sortDirection === ColumnSortDirection.None) {
        return ColumnSortDirection.Asc;
    }

    if (column.sortDirection === ColumnSortDirection.Desc) {
        return ColumnSortDirection.None;
    }

    return ColumnSortDirection.Desc;
};

export const createColumn = (field: string, column: Partial<Column>): Column => {
    const sortDirection = (column && column.sortable && column.sortDirection) || ColumnSortDirection.None;

    return {
        ...column,
        field,
        type: (column && column.type) || ColumnType.String,
        sortable: !!(column && column.sortable),
        sortDirection,
        sortOrder: (column && sortDirection !== ColumnSortDirection.None && column.sortOrder) || -1,
    };
};

export const reIndexSortOrders = (columns: Column[]): { [key: number]: number } => {
    return columns
        .filter((column: Column) => column.sortOrder > 0)
        .map((column: Column) => column.sortOrder)
        .slice()
        .sort((a: number, b: number) => a - b)
        .reduce((accumulator: { [key: number]: number }, current: number, index: number) => {
            return {
                ...accumulator,
                [current]: index + 1,
            };
        }, {});
};

export const sortColumn = (columnField: string, enabledMultiSort: boolean, columns: Column[]): Column[] => {
    let sortedColumns = columns.map((column: Column) => {
        if (column.field !== columnField) {
            if (!enabledMultiSort) {
                return { ...column, sortDirection: ColumnSortDirection.None, sortOrder: -1 };
            }

            return column;
        }

        const sortDirection: ColumnSortDirection = toogleSortDirection(column);

        return {
            ...column,
            sortDirection,
            sortOrder: sortDirection === ColumnSortDirection.None ? -1 : Number.MAX_VALUE,
        };
    });

    const reIndexedSortOrders: { [key: number]: number } = reIndexSortOrders(sortedColumns);

    sortedColumns = sortedColumns.map((column: Column) => {
        if (Object.prototype.hasOwnProperty.call(reIndexedSortOrders, column.sortOrder)) {
            return { ...column, sortOrder: reIndexedSortOrders[column.sortOrder] };
        }

        return column;
    });

    return sortedColumns;
};
