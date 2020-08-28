import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React from 'react';
import { DataGrid } from '../../src/components';
import { Column, ColumnSortDirection, ColumnType, DataGridOptions, DataGridSelectionMode } from '../../src/models';
import { createColumn } from '../../src/utils';

const styles = makeStyles({
    wrapper: {
        paddingTop: 50,
    },
});

const Demo: React.FC = () => {
    const classes = styles();

    const options: DataGridOptions = new DataGridOptions({
        multiSort: true,
        selection: { mode: DataGridSelectionMode.Multiple },
    });

    const columns: Column[] = [
        createColumn('id', { title: 'ID', type: ColumnType.String, sortable: true }),
        createColumn('name', {
            title: 'Name',
            type: ColumnType.String,
            tooltipText: 'This is the name',
            sortable: true,
            sortDirection: ColumnSortDirection.Asc,
            sortOrder: 2,
        }),
        createColumn('description', { title: 'Description', type: ColumnType.String, sortable: true }),
        createColumn('address', { title: 'Address', type: ColumnType.String, sortable: true }),
        createColumn('dateOfBirth', { title: 'Date of birth', type: ColumnType.Date }),
        createColumn('arrivalTime', { title: 'Arrival time', type: ColumnType.Datetime }),
        createColumn('time', { title: 'Time', type: ColumnType.Time, render: (value: string) => <b>{value}</b> }),
    ];

    const data: any[] = [
        {
            id: 1,
            arrivalTime: '2020-08-24T09:45:20',
            dateOfBirth: '1988-03-20',
            name: 'Name 1',
            description: 'Description 1',
            address: 'Address 1',
            time: '06:12:32',
        },
        {
            id: 2,
            arrivalTime: '2020-08-23T12:34:25',
            dateOfBirth: '1990-08-12',
            name: 'Name 2',
            description: 'Description 2',
            address: 'Address 2',
            time: '20:12:32',
        },
        {
            id: 3,
            arrivalTime: '2020-08-25T16:20:25',
            dateOfBirth: '1960-05-27',
            name: 'Name 3',
            description: 'Description 3',
            address: 'Address 3',
            time: '11:00:00',
        },
    ];

    return (
        <Container className={classes.wrapper}>
            <DataGrid
                data={data}
                columns={columns}
                options={options}
                onSort={(column: Column, columns: Column[]) => {
                    console.log('Column sorted', column);
                    console.log('All columns', columns);
                }}
            />
        </Container>
    );
};

export default Demo;
