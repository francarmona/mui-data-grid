import { Column } from './column';
import { DataGridSelectionMode } from './data-grid-selection';

export interface DataGridState {
    keyField: string;
    data: any[];
    columns: Column[];
    serverSide: boolean;
    pagination: boolean;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    count: number;
    page: number;
    multiSort: boolean;
    selectionMode: DataGridSelectionMode;
    selectedRows: any[];
    expandedRows: any[];
}
