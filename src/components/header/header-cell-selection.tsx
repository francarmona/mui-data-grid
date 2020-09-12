import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { IDataGridInstance } from '../../models';
import { allSelected } from '../../utils';

interface HeaderCellSelectionProps {
    dataGridInstance: IDataGridInstance;
}

export const HeaderCellSelection: React.FC<HeaderCellSelectionProps> = ({
    dataGridInstance,
}: HeaderCellSelectionProps) => {
    const { state, api } = dataGridInstance;
    const { data, selectedRows } = state;

    return (
        <TableCell padding="checkbox">
            <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                checked={allSelected(selectedRows, data)}
                onChange={() => api.selectAllRows()}
            />
        </TableCell>
    );
};

export default HeaderCellSelection;
