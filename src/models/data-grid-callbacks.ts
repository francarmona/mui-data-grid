import { Column } from './column';

export interface IDataGridCallbacks {
    onSort: (column: Column, columns: Column[]) => void;
    onSelectChange: (newSelectedRows: any[], prevSelectedRows: any[]) => void;
}
