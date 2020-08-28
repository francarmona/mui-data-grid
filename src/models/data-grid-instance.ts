import { DataGridState } from '../state/reducer';
import { IDataGridApi } from './data-grid-api';

export interface IDataGridInstance {
    state: DataGridState;
    api: IDataGridApi;
}
