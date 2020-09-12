import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Column, DataGridSelectionMode, IDataGridInstance, IRowDetailComponent } from '../../models';
import { renderCell } from '../../utils';
import { RowDetail } from './row-detail';
import { RowDetailCell } from './row-detail-cell';

interface RowStylesProps {
    isSelectable: boolean;
}

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        cursor: ({ isSelectable }: RowStylesProps) => (isSelectable ? 'pointer' : null),
    },
    tableCellDetail: {
        paddingBottom: 0,
        paddingTop: 0,
    },
});

interface RowProps {
    dataGridInstance: IDataGridInstance;
    row: any;
    rowDetailComponent: React.FC<IRowDetailComponent>;
}

export const Row: React.FC<RowProps> = ({
    row,
    dataGridInstance,
    rowDetailComponent: RowDetailComponent,
}: RowProps) => {
    const { state, api }: IDataGridInstance = dataGridInstance;

    const isSelectable = !!state.selectionMode;
    const isMultiSelectable = state.selectionMode === DataGridSelectionMode.Multiple;
    const isRowSelected = (): boolean => {
        const { keyField } = state;
        return !!state.selectedRows.find((selRow: any) => selRow[keyField] === row[keyField]);
    };
    const classes = useStyles({ isSelectable });

    return (
        <>
            <TableRow
                className={classes.root}
                hover={isSelectable}
                selected={isRowSelected()}
                aria-checked={isRowSelected()}
                onClick={isSelectable ? () => api.selectRow(row) : null}
                key={`table-row-${row[state.keyField]}`}
            >
                {isMultiSelectable && (
                    <TableCell padding="checkbox">
                        <Checkbox checked={isRowSelected()} />
                    </TableCell>
                )}

                {state.columns.map((column: Column) => (
                    <TableCell key={`table-cell-${column.field}`} align={column.align}>
                        {renderCell(column, row)}
                    </TableCell>
                ))}
                {RowDetailComponent && <RowDetailCell row={row} dataGridInstance={dataGridInstance} />}
            </TableRow>

            {RowDetailComponent && (
                <RowDetail row={row} rowDetailComponent={RowDetailComponent} dataGridInstance={dataGridInstance} />
            )}
        </>
    );
};
