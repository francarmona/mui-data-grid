import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import parseISO from 'date-fns/parseISO';
import get from 'lodash.get';
import { DEFAULT_DATETIME_FORMAT, DEFAULT_DATE_FORMAT } from '../constants';
import { Column, ColumnType } from '../models';

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

export const allSelected = (selectedRows: any[], data: any[]): boolean => selectedRows.length === data.length;

export const isRowExpanded = (expandedRows: any[], rowId: any): boolean => expandedRows.includes(rowId);
