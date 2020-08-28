import { Column, DataGridSelectionMode } from '../models';
import { sortColumn } from '../utils';
import { DataGridActionTypes, SET_COLUMNS, SET_PAGE, SET_ROWS_PER_PAGE, SORT_COLUMN } from './actions';

export interface DataGridState {
    keyField: string;
    data: any[];
    columns: Column[];
    rowsPerPage: number;
    page: number;
    multiSort: boolean;
    selectionMode: DataGridSelectionMode;
}

export const initialState: DataGridState = {
    keyField: null,
    data: [],
    columns: [],
    rowsPerPage: -1,
    page: -1,
    multiSort: true,
    selectionMode: null,
};

export const dataGridReducer = (state: DataGridState, action: DataGridActionTypes): DataGridState => {
    switch (action.type) {
        case SET_ROWS_PER_PAGE:
            return { ...state, rowsPerPage: action.payload };
        case SET_PAGE:
            return { ...state, page: action.payload };
        case SET_COLUMNS:
            return { ...state, columns: action.payload };
        case SORT_COLUMN: {
            const { columnField, enabledMultiSort } = action.payload;
            return { ...state, columns: sortColumn(columnField, enabledMultiSort, state.columns) };
        }
        default:
            return state;
    }
};
