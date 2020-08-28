import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { DataGridSelectionMode, IDataGridInstance } from '../models';
import { allSelected } from '../utils';

interface HeaderCellSelectionProps {
    dataGridInstance: IDataGridInstance;
}

const HeaderCellSelection: React.FC<HeaderCellSelectionProps> = ({ dataGridInstance }: HeaderCellSelectionProps) => {
    const { state, api } = dataGridInstance;
    const { data, selectedRows } = state;

    return (
        state.selectionMode === DataGridSelectionMode.Multiple && (
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={allSelected(selectedRows, data)}
                    onChange={() => api.selectAllRows()}
                />
            </TableCell>
        )
    );
};

export default HeaderCellSelection;
