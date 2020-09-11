import TableBody from '@material-ui/core/TableBody';
import React from 'react';
import { IRowDetailComponent } from '../models';
import { IDataGridInstance } from '../models/data-grid-instance';
import Row from './row';

interface BodyProps {
    dataGridInstance: IDataGridInstance;
    rowDetailComponent: React.FC<IRowDetailComponent>;
}

const Body: React.FC<BodyProps> = ({ dataGridInstance, rowDetailComponent: RowDetailComponent }: BodyProps) => {
    const { state }: IDataGridInstance = dataGridInstance;

    return (
        <TableBody>
            {state.data.map((row: any) => (
                <Row
                    key={`table-row-${row[state.keyField]}`}
                    row={row}
                    dataGridInstance={dataGridInstance}
                    rowDetailComponent={RowDetailComponent}
                />
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
