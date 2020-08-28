import { useEffect, useReducer } from 'react';
import { Column, DataGridOptions } from '../models';
import { IDataGridApi } from '../models/data-grid-api';
import { IDataGridInstance } from '../models/data-grid-instance';
import { dataGridActions } from '../state/actions';
import { dataGridReducer, initialState } from '../state/reducer';
import useMultiSort from './use-multi-sort';

const useDataGrid = (columns: Column[], data: any[], options: DataGridOptions): IDataGridInstance => {
    const {
        pagination: { rowsPerPage, page },
        multiSort,
        selection: { mode: selectionMode },
        keyField,
    } = options;

    const [state, dispatch] = useReducer(dataGridReducer, {
        ...initialState,
        columns,
        data,
        rowsPerPage,
        page,
        multiSort,
        selectionMode,
        keyField,
    });

    const enabledMultiSort = useMultiSort(multiSort);

    useEffect(() => {
        dispatch(dataGridActions.setColumns(columns));
    }, [columns]);

    const api: IDataGridApi = {
        setRowsPerPage(rpp: number) {
            dispatch(dataGridActions.setRowsPerPage(rpp));
        },
        setPage(pag: number) {
            dispatch(dataGridActions.setPage(pag));
        },
        setColumns(cols: Column[]) {
            dispatch(dataGridActions.setColumns(cols));
        },
        sortColumn(columnField: string) {
            dispatch(dataGridActions.sortColumn(columnField, enabledMultiSort));
        },
    };

    return { state, api };
};

export default useDataGrid;
