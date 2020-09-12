import { useEffect, useReducer } from 'react';
import { Column, DataGridOptions, IDataGridCallbacks, IDataGridApi, IDataGridInstance } from '../models';
import { dataGridActions } from '../state/actions';
import { dataGridReducer, initialState } from '../state/reducer';
import useMultiSort from './use-multi-sort';
import { sortColumn, allSelected, getSortedColumns } from '../utils';

const useDataGrid = (
    columns: Column[],
    data: any[],
    options: DataGridOptions,
    callbacks: IDataGridCallbacks,
): IDataGridInstance => {
    const {
        pagination,
        paginationOptions: { rowsPerPage, rowsPerPageOptions, page = 0 },
        multiSort,
        selection: { mode: selectionMode },
        keyField,
        serverSide,
    } = options;

    const count = serverSide ? options.paginationOptions.count || 0 : data.length;

    const [state, dispatch] = useReducer(dataGridReducer, {
        ...initialState,
        columns,
        data,
        pagination,
        rowsPerPage,
        rowsPerPageOptions,
        count,
        page,
        multiSort,
        selectionMode,
        keyField,
        serverSide,
    });

    const enabledMultiSort = useMultiSort(multiSort);

    // TODO: move to custom hooks
    useEffect(() => {
        dispatch(dataGridActions.setColumns(columns));
    }, [columns]);

    useEffect(() => {
        dispatch(dataGridActions.setData(data));
        dispatch(dataGridActions.setCount(count));
    }, [data, count]);

    useEffect(() => {
        dispatch(dataGridActions.setCount(options.paginationOptions.count));
    }, [options.paginationOptions.count]);

    const dispatchSelection = (newSelectedRows: any[], prevSelectedRows: any[]) => {
        dispatch(dataGridActions.setSelectedRows(newSelectedRows));
        if (callbacks.onSelectChange) {
            callbacks.onSelectChange(newSelectedRows, prevSelectedRows);
        }
    };

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
            if (callbacks.onSort) {
                callbacks.onSort(
                    sortedColumns.find((col: Column) => col.field === columnField),
                    getSortedColumns(sortedColumns),
                );
            }
        },
        selectRow(row: any) {
            // TODO: move to utils method -> handleRowsSelection
            const prevSelectedRows: any[] = [...state.selectedRows];
            let newSelectedRows: any[] = [];

            const selectedRow: any = state.selectedRows.find((selRow: any) => row[keyField] === selRow[keyField]);

            if (selectedRow) {
                newSelectedRows = state.selectedRows.filter(
                    (selRow: any) => selRow[keyField] !== selectedRow[keyField],
                );
            } else {
                newSelectedRows = [...state.selectedRows, row];
            }

            dispatchSelection(newSelectedRows, prevSelectedRows);
        },
        selectAllRows() {
            const prevSelectedRows: any[] = [...state.selectedRows];
            let newSelectedRows: any[] = [];

            if (!allSelected(state.selectedRows, data)) {
                newSelectedRows = [...data];
            }

            dispatchSelection(newSelectedRows, prevSelectedRows);
        },
        expandRow(rowId: any) {
            const expandedRow = state.expandedRows.find((rId) => rId === rowId);

            if (expandedRow) {
                dispatch(dataGridActions.setExpandedRows(state.expandedRows.filter((rId) => rId !== rowId)));
            } else {
                dispatch(dataGridActions.setExpandedRows([...state.expandedRows, rowId]));
            }
        },
    };

    return { state, api };
};

export default useDataGrid;
