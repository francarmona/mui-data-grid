import { Column } from '../models';

export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const SET_COLUMNS = 'SET_COLUMNS';

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

export type DataGridActionTypes = SetRowsPerPageAction | SetPageAction | SetColumnsAction;

export const dataGridActions = {
    setRowsPerPage: (rowsPerPage: number): DataGridActionTypes => ({ type: SET_ROWS_PER_PAGE, payload: rowsPerPage }),
    setPage: (page: number): DataGridActionTypes => ({ type: SET_PAGE, payload: page }),
    setColumns: (columns: Column[]): DataGridActionTypes => ({ type: SET_COLUMNS, payload: columns }),
};
