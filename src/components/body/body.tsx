import TableBody from '@material-ui/core/TableBody';
import React from 'react';
import { IRowDetailComponent } from '../../models';
import { IDataGridInstance } from '../../models/data-grid-instance';
import { processData } from '../../utils';
import { Row } from '../row';

interface BodyProps {
    dataGridInstance: IDataGridInstance;
    rowDetailComponent: React.FC<IRowDetailComponent>;
}

export const Body: React.FC<BodyProps> = ({ dataGridInstance, rowDetailComponent: RowDetailComponent }: BodyProps) => {
    const { state }: IDataGridInstance = dataGridInstance;

    return (
        <TableBody>
            {processData(state).map((row: any) => (
                <Row
                    key={`table-row-${row[state.keyField]}`}
                    row={row}
                    dataGridInstance={dataGridInstance}
                    rowDetailComponent={RowDetailComponent}
                />
            ))}
        </TableBody>
    );
};
