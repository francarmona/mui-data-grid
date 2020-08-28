import { Column } from '../models';

export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SORT_COLUMN = 'SORT_COLUMN';

interface SetRowsPerPageAction {
    type: typeof SET_ROWS_PER_PAGE;
    payload: number;
}

interface SetPageAction {
    type: typeof SET_PAGE;
    payload: number;
}

interface SetColumnsAction {
    type: typeof SET_COLUMNS;
    payload: Column[];
}

interface SortColumnActionPayload {
    columnField: string;
    enabledMultiSort: boolean;
}

interface SortColumnAction {
    type: typeof SORT_COLUMN;
    payload: SortColumnActionPayload;
}

export type DataGridActionTypes = SetRowsPerPageAction | SetPageAction | SetColumnsAction | SortColumnAction;

export const dataGridActions = {
    setRowsPerPage: (rowsPerPage: number): DataGridActionTypes => ({ type: SET_ROWS_PER_PAGE, payload: rowsPerPage }),
    setPage: (page: number): DataGridActionTypes => ({ type: SET_PAGE, payload: page }),
    setColumns: (columns: Column[]): DataGridActionTypes => ({ type: SET_COLUMNS, payload: columns }),
    sortColumn: (columnField: string, enabledMultiSort: boolean): DataGridActionTypes => ({
        type: SORT_COLUMN,
        payload: { columnField, enabledMultiSort },
    }),
};
