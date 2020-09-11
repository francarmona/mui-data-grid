import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { MouseEvent } from 'react';
import { Column, DataGridSelectionMode, IDataGridInstance, IRowDetailComponent } from '../models';
import { renderCell } from '../utils';

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

const Row: React.FC<RowProps> = ({ row, dataGridInstance, rowDetailComponent: RowDetailComponent }: RowProps) => {
    const { state, api }: IDataGridInstance = dataGridInstance;

    const isSelectable = !!state.selectionMode;
    const isMultiSelectable = state.selectionMode === DataGridSelectionMode.Multiple;
    const isRowSelected = (): boolean => {
        const { keyField } = state;
        return !!state.selectedRows.find((selRow: any) => selRow[keyField] === row[keyField]);
    };

    const classes = useStyles({ isSelectable });

    const rowDetailColSpan = (): number => {
        if (state.selectionMode === DataGridSelectionMode.Multiple) {
            return state.columns.length + 2;
        }

        return state.columns.length + 1;
    };

    const isRowExpanded = (): boolean => {
        return state.expandedRows.includes(row[state.keyField]);
    };

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
                    <TableCell key={`table-cell-${column.field}`}>{renderCell(column, row)}</TableCell>
                ))}
                {RowDetailComponent && (
                    <TableCell align="center">
                        <IconButton
                            size="small"
                            onClick={(event: MouseEvent) => {
                                event.stopPropagation();
                                api.expandRow(row[state.keyField]);
                            }}
                        >
                            {isRowExpanded() ? (
                                <ExpandLess fontSize="small" color="action" />
                            ) : (
                                <ExpandMore fontSize="small" color="action" />
                            )}
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>

            {RowDetailComponent && (
                <TableRow>
                    <TableCell className={classes.tableCellDetail} colSpan={rowDetailColSpan()}>
                        <Collapse in={isRowExpanded()} unmountOnExit timeout="auto">
                            <Box margin={1}>
                                <RowDetailComponent row={row} />
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default Row;
