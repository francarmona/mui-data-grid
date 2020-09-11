import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import useDataGrid from '../hooks/use-data-grid';
import { Column, DataGridOptions, IRowDetailComponent } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';
import Body from './body';
import Header from './header';

interface DataGridProps {
    columns: Column[];
    data: any[];
    options?: DataGridOptions;
    rowDetailComponent?: React.FC<IRowDetailComponent>;
    onSort?: (column: Column, columns: Column[]) => void;
    onSelectChange?: (newSelectedRows: any[], prevSelectedRows: any[]) => void;
    // selectedDataRows?: T[];
    // onSelected?: (selected: T[]) => void;
    // onDeselected?: (deselected: T) => void;
    // onTableChange?: (action: string, tableState: TableState) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
    columns,
    data,
    options = new DataGridOptions(),
    onSort,
    onSelectChange,
    rowDetailComponent,
}: DataGridProps) => {
    // const { columns, data, options = new DataGridOptions() } = props;

    const dataGridInstace: IDataGridInstance = useDataGrid(columns, data, options, { onSort, onSelectChange });

    return (
        <>
            <Paper elevation={0}>
                <Table stickyHeader={options.stickyHeader}>
                    <Header dataGridInstance={dataGridInstace} rowDetailComponent={rowDetailComponent} />
                    <Body dataGridInstance={dataGridInstace} rowDetailComponent={rowDetailComponent} />
                </Table>
                {/* {isPageable(tableOptions) && (
                    <TablePagination
                        classes={{ spacer: classes.spacer, toolbar: classes.toolbar }}
                        component="div"
                        rowsPerPageOptions={pageableOptions.rowsPerPageOptions}
                        count={pageableOptions.count}
                        rowsPerPage={pageableOptions.rowsPerPage}
                        page={pageableOptions.page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )} */}
            </Paper>
        </>
    );
};

export default DataGrid;
