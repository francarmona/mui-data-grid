import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { DataGridSelectionMode } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';

interface HeaderCellSelectionProps {
    dataGridInstance: IDataGridInstance;
}

const HeaderCellSelection: React.FC<HeaderCellSelectionProps> = ({ dataGridInstance }: HeaderCellSelectionProps) => {
    const { state } = dataGridInstance;

    return (
        state.selectionMode === DataGridSelectionMode.Multiple && (
            <TableCell padding="checkbox">
                <Checkbox
                    // indeterminate={selectedRows.length > 0 && selectedRows.length < pageableOptions.count}
                    checked={true}
                    onChange={() => {}}
                />
            </TableCell>
        )
    );
};

export default HeaderCellSelection;
