export interface DataGridPagination {
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    count?: number;
    page?: number;
}

export interface IPagination {
    rowsPerPage: number;
    page: number;
}
