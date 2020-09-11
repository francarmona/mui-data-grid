import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Column, IRowDetailComponent, DataGridSelectionMode } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';
import HeaderCell from './header-cell';
import HeaderCellSelection from './header-cell-selection';

interface HeaderProps {
    dataGridInstance: IDataGridInstance;
    rowDetailComponent: React.FC<IRowDetailComponent>;
}

const Header: React.FC<HeaderProps> = ({ dataGridInstance, rowDetailComponent }: HeaderProps) => {
    const { state } = dataGridInstance;

    return (
        <TableHead>
            <TableRow>
                {state.selectionMode === DataGridSelectionMode.Multiple && (
                    <HeaderCellSelection dataGridInstance={dataGridInstance} />
                )}

                {state.columns.map((column: Column) => (
                    <HeaderCell key={column.field} dataGridInstance={dataGridInstance} column={column} />
                ))}
                {rowDetailComponent && <TableCell key="Detail" padding="default" />}
            </TableRow>
        </TableHead>
    );
};

export default Header;
