import { useEffect, useReducer } from 'react';
import { Column, DataGridOptions, IDataGridCallbacks, IDataGridApi, IDataGridInstance } from '../models';
import { dataGridActions } from '../state/actions';
import { dataGridReducer, initialState } from '../state/reducer';
import useMultiSort from './use-multi-sort';
import { sortColumn } from '../utils';

const useDataGrid = (
    columns: Column[],
    data: any[],
    options: DataGridOptions,
    callbacks: IDataGridCallbacks,
): IDataGridInstance => {
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
            const sortedColumns: Column[] = sortColumn(columnField, enabledMultiSort, state.columns);
            dispatch(dataGridActions.setColumns(sortedColumns));
            callbacks.onSort(
                sortedColumns.find((col: Column) => col.field === columnField),
                sortedColumns,
            );
        },
    };

    return { state, api };
};

export default useDataGrid;
