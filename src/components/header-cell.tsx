import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { Column, ColumnSortDirection, SortDirection } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';

interface HeaderCellProps {
    dataGridInstance: IDataGridInstance;
    column: Column;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ dataGridInstance, column }: HeaderCellProps) => {
    const { title, tooltipText, field } = column;
    const { api } = dataGridInstance;

    const isSorting = column.sortDirection && column.sortDirection !== ColumnSortDirection.None;

    const tableCell = (
        <TableCell key={field}>
            {column.sortable ? (
                <TableSortLabel
                    onClick={() => api.sortColumn(column.field)}
                    direction={(isSorting ? column.sortDirection : ColumnSortDirection.Asc) as SortDirection}
                    active={isSorting}
                >
                    {title}
                </TableSortLabel>
            ) : (
                <div>{title}</div>
            )}
        </TableCell>
    );

    return tooltipText ? (
        <Tooltip placement="top" key={field} title={tooltipText}>
            {tableCell}
        </Tooltip>
    ) : (
        tableCell
    );
};

export default HeaderCell;
