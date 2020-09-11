import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { MouseEvent } from 'react';
import { IDataGridInstance } from '../models';
import { isRowExpanded } from '../utils';

interface RowDetailCellProps {
    dataGridInstance: IDataGridInstance;
    row: any;
}

const RowDetailCell: React.FC<RowDetailCellProps> = ({ row, dataGridInstance }: RowDetailCellProps) => {
    const { state, api }: IDataGridInstance = dataGridInstance;

    return (
        <TableCell align="center">
            <IconButton
                size="small"
                onClick={(event: MouseEvent) => {
                    event.stopPropagation();
                    api.expandRow(row[state.keyField]);
                }}
            >
                {isRowExpanded(state.expandedRows, row[state.keyField]) ? (
                    <ExpandLess fontSize="small" color="action" />
                ) : (
                    <ExpandMore fontSize="small" color="action" />
                )}
            </IconButton>
        </TableCell>
    );
};

export default RowDetailCell;
