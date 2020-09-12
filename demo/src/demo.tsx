import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { ReactElement, useState } from 'react';

import {
    DataGrid,
    Column,
    ColumnSortDirection,
    ColumnType,
    DataGridOptions,
    DataGridSelectionMode,
    IRowDetailComponent,
    IPagination,
    createColumn,
} from '../../src';

const styles = makeStyles({
    wrapper: {
        paddingTop: 50,
    },
});

const RowDetail: React.FC<IRowDetailComponent> = ({ row }: IRowDetailComponent): ReactElement => {
    return <div>{row.id}</div>;
};

const mockData: any[] = [
    {
        id: 1,
        arrivalTime: '2020-08-24T09:45:20',
        dateOfBirth: '1988-03-20',
        name: 'Name ab',
        description: 'Description 3',
        address: { street: 'Address 1' },
        time: '06:12:32',
    },
    {
        id: 2,
        arrivalTime: '2020-08-23T12:34:25',
        dateOfBirth: '1990-08-12',
        name: 'Name ab',
        description: 'Description 2',
        address: { street: 'Address 2' },
        time: '20:12:32',
    },
    {
        id: 3,
        arrivalTime: '2020-08-25T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name ab',
        description: 'Description 1',
        address: { street: 'Address 3' },
        time: '11:00:00',
    },
    {
        id: 4,
        arrivalTime: '2020-08-25T11:10:25',
        dateOfBirth: '1960-05-27',
        name: 'Name cde',
        description: 'Description b',
        address: { street: 'Address 3' },
        time: '18:30:00',
    },
    {
        id: 5,
        arrivalTime: '2020-08-20T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name cde',
        description: 'Description a',
        address: { street: 'Address 3' },
        time: '16:30:00',
    },
    {
        id: 6,
        arrivalTime: '2020-08-18T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name cde',
        description: 'Description f',
        address: { street: 'Address 3' },
        time: '12:20:00',
    },
    {
        id: 7,
        arrivalTime: '2020-08-29T12:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name fg',
        description: 'Description 5',
        address: { street: 'Address i' },
        time: '08:20:00',
    },
    {
        id: 8,
        arrivalTime: '2020-08-02T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name fg',
        description: 'Description 3',
        address: { street: 'Address y' },
        time: '13:00:00',
    },
    {
        id: 9,
        arrivalTime: '2020-08-21T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name fg',
        description: 'Description 7',
        address: { street: 'Address v' },
        time: '22:20:30',
    },
    {
        id: 10,
        arrivalTime: '2020-08-11T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name test',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '22:40:00',
    },
    {
        id: 11,
        arrivalTime: '2020-08-05T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name jk',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '19:00:10',
    },
    {
        id: 12,
        arrivalTime: '2020-08-09T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name rs',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '08:00:00',
    },
    {
        id: 13,
        arrivalTime: '2020-08-18T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name ch',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '06:50:00',
    },
    {
        id: 14,
        arrivalTime: '2020-08-19T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name oi',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '17:40:00',
    },
    {
        id: 15,
        arrivalTime: '2020-08-20T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name lk',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '15:43:20',
    },
    {
        id: 16,
        arrivalTime: '2020-08-06T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name ts',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '15:43:12',
    },
    {
        id: 17,
        arrivalTime: '2020-08-11T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name we',
        description: 'Description',
        address: { street: 'Address 3' },
        time: '05:00:00',
    },
    {
        id: 18,
        arrivalTime: '2020-08-25T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name kg',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '21:30:20',
    },
    {
        id: 19,
        arrivalTime: '2020-08-25T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name kh',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '12:45:30',
    },
    {
        id: 20,
        arrivalTime: '2020-08-25T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name we',
        description: 'bcd',
        address: { street: 'Address 3' },
        time: '12:45:00',
    },
    {
        id: 21,
        arrivalTime: '2020-08-25T16:20:25',
        dateOfBirth: '1960-05-27',
        name: 'Name mn',
        description: 'Description 3',
        address: { street: 'Address 3' },
        time: '01:23:00',
    },
];

const getData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 1000);
    });
};

const Demo: React.FC = () => {
    const [data, setData] = useState([]);
    const classes = styles();

    getData().then((d: any) => {
        setData(d);
    });

    const columns: Column[] = [
        createColumn('id', { title: 'ID', type: ColumnType.Numeric, sortable: true, align: 'right' }),
        createColumn('name', {
            title: 'Name',
            type: ColumnType.String,
            tooltipText: 'This is the name',
            sortable: true,
            sortDirection: ColumnSortDirection.Asc,
            sortOrder: 2,
        }),
        createColumn('description', { title: 'Description', type: ColumnType.String, sortable: true }),
        createColumn('address.street', { title: 'Address', type: ColumnType.String, sortable: true }),
        createColumn('dateOfBirth', { title: 'Date of birth', type: ColumnType.Date }),
        createColumn('arrivalTime', { title: 'Arrival time', type: ColumnType.Datetime, sortable: true }),
        createColumn('time', {
            title: 'Time',
            type: ColumnType.Time,
            render: (value: string) => <b>{value}</b>,
            sortable: true,
        }),
    ];

    const options: DataGridOptions = new DataGridOptions({
        multiSort: true,
        selection: { mode: DataGridSelectionMode.Multiple },
        pagination: true,
        // serverSide: true,
        // paginationOptions: { rowsPerPage: 10, rowsPerPageOptions: [10, 25, 100] },
    });

    return (
        <Container className={classes.wrapper}>
            <DataGrid
                data={data}
                columns={columns}
                options={options}
                onSort={(column: Column, sortedColumns: Column[]) => {
                    console.log('Column sorted: ', column);
                    console.log('Sorted columns: ', sortedColumns);
                }}
                onSelectChange={(selectedRows: any[], prevSelectedRows: any[]) => {
                    console.log('Selected rows: ', selectedRows);
                    console.log('Prev. selected rows: ', prevSelectedRows);
                }}
                onPaginationChange={(pagination: IPagination) => {
                    console.log('Pagination: ', pagination);
                }}
                rowDetailComponent={RowDetail}
            />
        </Container>
    );
};

export default Demo;
