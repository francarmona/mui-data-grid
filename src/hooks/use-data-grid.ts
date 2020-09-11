import { useEffect, useReducer } from 'react';
import { Column, DataGridOptions, IDataGridCallbacks, IDataGridApi, IDataGridInstance } from '../models';
import { dataGridActions } from '../state/actions';
import { dataGridReducer, initialState } from '../state/reducer';
import useMultiSort from './use-multi-sort';
import { sortColumn, allSelected } from '../utils';

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
                    sortedColumns,
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
