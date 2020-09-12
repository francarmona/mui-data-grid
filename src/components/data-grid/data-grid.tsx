import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import useDataGrid from '../../hooks/use-data-grid';
import { Column, DataGridOptions, IRowDetailComponent, IPagination } from '../../models';
import { IDataGridInstance } from '../../models/data-grid-instance';
import { Body } from '../body';
import { Header } from '../header';
import { Pagination } from '../pagination';

interface DataGridProps {
    columns: Column[];
    data: any[];
    options?: DataGridOptions;
    rowDetailComponent?: React.FC<IRowDetailComponent>;
    onSort?: (column: Column, columns: Column[]) => void;
    onSelectChange?: (newSelectedRows: any[], prevSelectedRows: any[]) => void;
    onPaginationChange?: (pagination: IPagination) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({
    columns,
    data,
    options = new DataGridOptions(),
    rowDetailComponent,
    onSort,
    onSelectChange,
    onPaginationChange,
}: DataGridProps) => {
    const dataGridInstace: IDataGridInstance = useDataGrid(columns, data, options, {
        onSort,
        onSelectChange,
    });

    return (
        <>
            <Paper elevation={0}>
                <Table stickyHeader={options.stickyHeader}>
                    <Header dataGridInstance={dataGridInstace} rowDetailComponent={rowDetailComponent} />
                    <Body dataGridInstance={dataGridInstace} rowDetailComponent={rowDetailComponent} />
                </Table>
                {options.pagination && (
                    <Pagination dataGridInstance={dataGridInstace} onPaginationChange={onPaginationChange} />
                )}
            </Paper>
        </>
    );
};
