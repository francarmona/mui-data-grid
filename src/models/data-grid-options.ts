import { DataGridSelection } from './data-grid-selection';
import { DataGridPagination } from './data-grid-pagination';

export class DataGridOptions {
    public readonly keyField: string = 'id';

    public readonly pagination: DataGridPagination = { rowsPerPage: 10, page: 0, rowsPerPageOptions: [10, 50, 100] };

    public readonly selection: DataGridSelection = { mode: null };

    public readonly serverSide: boolean = false;

    public readonly stickyHeader: boolean = true;

    public readonly multiSort: boolean = false;

    constructor(options?: Partial<DataGridOptions>) {
        Object.assign(this, options);
    }
}

export default DataGridOptions;
