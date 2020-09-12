import { Column } from '../models';

export const SET_DATA = 'SET_DATA';
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const SET_COUNT = 'SET_COUNT';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';
export const SET_EXPANDED_ROWS = 'SET_EXPANDED_ROWS';

interface SetDataAction {
    type: typeof SET_DATA;
    payload: any[];
}

interface SetRowsPerPageAction {
    type: typeof SET_ROWS_PER_PAGE;
    payload: number;
}

interface SetPageAction {
    type: typeof SET_PAGE;
    payload: number;
}

interface SetCountAction {
    type: typeof SET_COUNT;
    payload: number;
}

interface SetColumnsAction {
    type: typeof SET_COLUMNS;
    payload: Column[];
}

interface SetSelectedRowsAction {
    type: typeof SET_SELECTED_ROWS;
    payload: any[];
}

interface SetExpandedRowsAction {
    type: typeof SET_EXPANDED_ROWS;
    payload: any[];
}

export type DataGridActionTypes =
    | SetRowsPerPageAction
    | SetPageAction
    | SetColumnsAction
    | SetSelectedRowsAction
    | SetExpandedRowsAction
    | SetDataAction
    | SetCountAction;

export const dataGridActions = {
    setData: (data: any[]): DataGridActionTypes => ({ type: SET_DATA, payload: data }),
    setRowsPerPage: (rowsPerPage: number): DataGridActionTypes => ({ type: SET_ROWS_PER_PAGE, payload: rowsPerPage }),
    setPage: (page: number): DataGridActionTypes => ({ type: SET_PAGE, payload: page }),
    setCount: (count: number): DataGridActionTypes => ({ type: SET_COUNT, payload: count }),
    setColumns: (columns: Column[]): DataGridActionTypes => ({ type: SET_COLUMNS, payload: columns }),
    setSelectedRows: (rows: any[]): DataGridActionTypes => ({ type: SET_SELECTED_ROWS, payload: rows }),
    setExpandedRows: (rows: any[]): DataGridActionTypes => ({ type: SET_EXPANDED_ROWS, payload: rows }),
};
