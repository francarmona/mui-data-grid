import { IDataGridApi } from './data-grid-api';
import { DataGridState } from './data-grid-state';

export interface IDataGridInstance {
    state: DataGridState;
    api: IDataGridApi;
}
