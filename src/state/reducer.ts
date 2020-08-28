import { DataGridState } from '../models';
import { DataGridActionTypes, SET_COLUMNS, SET_PAGE, SET_ROWS_PER_PAGE, SET_SELECTED_ROWS } from './actions';

export const initialState: DataGridState = {
    keyField: null,
    data: [],
    columns: [],
    rowsPerPage: -1,
    page: -1,
    multiSort: true,
    selectionMode: null,
    selectedRows: [],
};

export const dataGridReducer = (state: DataGridState, action: DataGridActionTypes): DataGridState => {
    switch (action.type) {
        case SET_ROWS_PER_PAGE:
            return { ...state, rowsPerPage: action.payload };
        case SET_PAGE:
            return { ...state, page: action.payload };
        case SET_COLUMNS:
            return { ...state, columns: action.payload };
        case SET_SELECTED_ROWS:
            return { ...state, selectedRows: action.payload };
        default:
            return state;
    }
};
