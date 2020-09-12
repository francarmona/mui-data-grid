import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import parseISO from 'date-fns/parseISO';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import { DEFAULT_DATETIME_FORMAT, DEFAULT_DATE_FORMAT } from '../constants';
import { Column, ColumnType, DataGridState, ColumnSortDirection } from '../models';

export const getCellValue = (field: string, row: any): any => get(row, field);

export const formatDate = (date: string, dateFormat: string): string => {
    const parsedDate: Date = parseISO(date);

    return isValid(parsedDate) ? format(parsedDate, dateFormat) : '';
};

export const renderCell = (column: Column, row: any): any => {
    const value = getCellValue(column.field, row);

    if (column.render) {
        return column.render(value, row);
    }

    if (column.type === ColumnType.Date) {
        return formatDate(value, DEFAULT_DATE_FORMAT);
    }

    if (column.type === ColumnType.Datetime) {
        return formatDate(value, DEFAULT_DATETIME_FORMAT);
    }

    return value;
};

export const allSelected = (selectedRows: any[], data: any[]): boolean =>
    data.length > 0 && selectedRows.length === data.length;

export const isRowExpanded = (expandedRows: any[], rowId: any): boolean => expandedRows.includes(rowId);

const getIteratees = (sortedColumns: Column[]) => {
    return sortedColumns.map((sortedColumn: Column) => {
        return (row: any) => {
            const cellValue = getCellValue(sortedColumn.field, row);

            if (sortedColumn.type === ColumnType.Date || sortedColumn.type === ColumnType.Datetime) {
                return new Date(cellValue);
            }

            if (sortedColumn.type === ColumnType.String) {
                return cellValue.toUpperCase();
            }

            return cellValue;
        };
    });
};

const getOrders = (sortedColumns: Column[]): ColumnSortDirection[] => {
    return sortedColumns.map((sortedColumn: Column) => sortedColumn.sortDirection);
};

export const getSortedColumns = (columns: Column[]): Column[] =>
    orderBy(
        columns.filter((c: Column) => c.sortOrder !== -1),
        ['sortOrder'],
    );

const sortData = (data: any[], sortedColumns: Column[]): any[] => {
    if (sortedColumns.length === 0) {
        return data;
    }

    return orderBy(data, getIteratees(sortedColumns), getOrders(sortedColumns) as ('asc' | 'desc')[]);
};

export const processData = (state: DataGridState): any[] => {
    const { serverSide, pagination, data, page, rowsPerPage, columns } = state;

    if (serverSide) {
        return data;
    }

    const sortedData = sortData(data, getSortedColumns(columns));

    if (pagination) {
        return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return sortedData;
};
