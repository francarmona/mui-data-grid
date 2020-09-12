import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { DataGridSelectionMode, IDataGridInstance, IRowDetailComponent } from '../../models';
import { isRowExpanded } from '../../utils';

const useStyles = makeStyles({
    tableCellDetail: {
        paddingBottom: 0,
        paddingTop: 0,
    },
});

interface RowDetailProps {
    dataGridInstance: IDataGridInstance;
    row: any;
    rowDetailComponent: React.FC<IRowDetailComponent>;
}

export const RowDetail: React.FC<RowDetailProps> = ({
    row,
    dataGridInstance,
    rowDetailComponent: RowDetailComponent,
}: RowDetailProps) => {
    const { state }: IDataGridInstance = dataGridInstance;
    const classes = useStyles();

    const rowDetailColSpan = (): number => {
        if (state.selectionMode === DataGridSelectionMode.Multiple) {
            return state.columns.length + 2;
        }

        return state.columns.length + 1;
    };

    return (
        <TableRow>
            <TableCell className={classes.tableCellDetail} colSpan={rowDetailColSpan()}>
                <Collapse in={isRowExpanded(state.expandedRows, row[state.keyField])} unmountOnExit timeout="auto">
                    <Box margin={1}>
                        <RowDetailComponent row={row} />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};
