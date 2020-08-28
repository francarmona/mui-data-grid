import { Column } from './column';
import { DataGridSelectionMode } from './data-grid-selection';

export interface DataGridState {
    keyField: string;
    data: any[];
    columns: Column[];
    rowsPerPage: number;
    page: number;
    multiSort: boolean;
    selectionMode: DataGridSelectionMode;
    selectedRows: any[];
}
