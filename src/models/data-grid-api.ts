import { Column } from './column';

export interface IDataGridApi {
    setRowsPerPage: (rowsPerPage: number) => void;
    setPage: (page: number) => void;
    setColumns: (columns: Column[]) => void;
    sortColumn: (columnField: string) => void;
}
