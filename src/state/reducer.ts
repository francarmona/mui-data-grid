import { DataGridState } from '../models';
import {
    DataGridActionTypes,
    SET_COLUMNS,
    SET_PAGE,
    SET_ROWS_PER_PAGE,
    SET_SELECTED_ROWS,
    SET_EXPANDED_ROWS,
    SET_DATA,
    SET_COUNT,
} from './actions';

export const initialState: DataGridState = {
    keyField: null,
    data: [],
    columns: [],
    serverSide: false,
    rowsPerPage: -1,
    rowsPerPageOptions: [],
    pagination: false,
    count: 0,
    page: -1,
    multiSort: true,
    selectionMode: null,
    selectedRows: [],
    expandedRows: [],
};

export const dataGridReducer = (state: DataGridState, action: DataGridActionTypes): DataGridState => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, data: action.payload };
        case SET_ROWS_PER_PAGE:
            return { ...state, rowsPerPage: action.payload };
        case SET_PAGE:
            return { ...state, page: action.payload };
        case SET_COUNT:
            return { ...state, count: action.payload };
        case SET_COLUMNS:
            return { ...state, columns: action.payload };
        case SET_SELECTED_ROWS:
            return { ...state, selectedRows: action.payload };
        case SET_EXPANDED_ROWS:
            return { ...state, expandedRows: action.payload };
        default:
            return state;
    }
};
