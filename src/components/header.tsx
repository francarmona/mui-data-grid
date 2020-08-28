import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Column } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';
import HeaderCell from './header-cell';
import HeaderCellSelection from './header-cell-selection';

interface HeaderProps {
    dataGridInstance: IDataGridInstance;
}

const Header: React.FC<HeaderProps> = ({ dataGridInstance }: HeaderProps) => {
    const {
        state: { columns },
    } = dataGridInstance;

    return (
        <TableHead>
            <TableRow>
                <HeaderCellSelection dataGridInstance={dataGridInstance} />
                {columns.map((column: Column) => (
                    <HeaderCell key={column.field} dataGridInstance={dataGridInstance} column={column} />
                ))}
            </TableRow>
        </TableHead>
    );
};

export default Header;
