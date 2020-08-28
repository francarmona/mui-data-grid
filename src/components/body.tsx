import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { Fragment } from 'react';
import { Column, DataGridSelectionMode } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';
import { renderCell } from '../utils';

interface BodyProps {
    dataGridInstance: IDataGridInstance;
}

const Body: React.FC<BodyProps> = ({ dataGridInstance }: BodyProps) => {
    const { state, api }: IDataGridInstance = dataGridInstance;

    const isSelectable = !!state.selectionMode;
    const isMultiSelectable = state.selectionMode === DataGridSelectionMode.Multiple;
    const isRowSelected = (row: any): boolean => {
        const { keyField } = state;
        return !!state.selectedRows.find((selRow: any) => selRow[keyField] === row[keyField]);
    };

    return (
        <TableBody>
            {state.data.map((row: any) => (
                <Fragment key={`table-row-${row[state.keyField]}`}>
                    <TableRow
                        hover={isSelectable}
                        selected={isRowSelected(row)}
                        aria-checked={isRowSelected(row)}
                        onClick={isSelectable ? () => api.selectRow(row) : null}
                        key={`table-row-${row[state.keyField]}`}
                    >
                        {isMultiSelectable && (
                            <TableCell padding="checkbox">
                                <Checkbox checked={isRowSelected(row)} />
                            </TableCell>
                        )}

                        {state.columns.map((column: Column) => (
                            <TableCell
                                // align={tableCellAlignment(column)}
                                key={`table-cell-${column.field}`}
                                // className={clsx(classes.tableCell, {
                                //     [classes.expandableCell]: hasDetail([column]),
                                //     [classes.tableCellSelected]:
                                //         isSingleSelectable(tableOptions.selectable) && isSelected(row, selectedRows),
                                // })}
                                // onClick={
                                //     hasDetail([column])
                                //         ? (event: MouseEvent) => handleExpandRow(event, tableRowKey(row), column)
                                //         : null
                                // }
                            >
                                {renderCell(column, row)}
                                {/* {hasDetail([column]) && (
                                    <IconButton size="small">
                                        <ExpandMore
                                            fontSize="small"
                                            color="action"
                                            className={clsx({
                                                [classes.expandableIconLess]:
                                                    isRowExpanded(tableRowKey(row), expandedRow) &&
                                                    isEqual(columnClickedToExpand, column),
                                            })}
                                        />
                                    </IconButton>
                                )} */}
                            </TableCell>
                        ))}
                    </TableRow>

                    {/* {hasDetail(columns) && (
                        <TableRow>
                            <TableCell
                                className={classes.tableCellDetail}
                                colSpan={calculateColSpan(columns, tableOptions.selectable)}
                            >
                                <Collapse
                                    in={isRowExpanded(tableRowKey(row), expandedRow)}
                                    unmountOnExit
                                    timeout="auto"
                                >
                                    {columnClickedToExpand && columnClickedToExpand.detail(row)}
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    )} */}
                </Fragment>
            ))}
            {/* {emptyRows > 0 && !tableOptions.noEmptyCells && (
                <TableRow
                    style={{
                        height: getEmptyRowsHeight(emptyRows, tableOptions.rowHeight, tableOptions.variant),
                    }}
                >
                    <TableCell colSpan={calculateColSpan(columns, tableOptions.selectable)} />
                </TableRow>
            )} */}
        </TableBody>
    );
};

export default Body;
