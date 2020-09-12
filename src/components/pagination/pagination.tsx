import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';
import { IDataGridInstance, IPagination } from '../../models';

interface PaginationProps {
    dataGridInstance: IDataGridInstance;
    onPaginationChange: (pagination: IPagination) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ dataGridInstance, onPaginationChange }: PaginationProps) => {
    const {
        api,
        state: { rowsPerPage, rowsPerPageOptions, page, count },
    }: IDataGridInstance = dataGridInstance;

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rpp = +event.target.value;
        api.setRowsPerPage(rpp);
        api.setPage(0);
        if (onPaginationChange) {
            onPaginationChange({ page: 0, rowsPerPage: rpp });
        }
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement>, pag: number) => {
        api.setPage(pag);
        if (onPaginationChange) {
            onPaginationChange({ page: pag, rowsPerPage });
        }
    };

    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={rowsPerPageOptions}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
};
