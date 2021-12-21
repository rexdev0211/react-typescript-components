import React, { useEffect, useMemo, useState } from 'react';

import formatDate from 'date-fns/format';
import { CellProps, Column, TableExpandedToggleProps } from 'react-table';
import { Button, Icon, IconButton, Pagination, Stack } from '@mui/material';

import { PriceFormatText } from '~/components/FormatInput';
import { MuiCustomReactTable, useMuiCustomReactTableRow } from '~/mui-custom/ReactTable';
import { ChevronDownSvg, ChevronUpSvg } from '~/assets/svg-icons/feather';

import { OrderDetails } from '../components/OrderDetails';
import { ShowOrdersForm } from '../components/ShowOrdersForm';

const createOrderData = (code: string, timestamp: number, cost: number) => {
    return { code, timestamp, cost };
};

type Order = ReturnType<typeof createOrderData>;

const fetchData = async (): Promise<Order[]> => {
    return [
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 82315),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54),
        createOrderData('94812-44 ', new Date().getTime(), 532.54)
    ];
};

export const PastOrdersTable = () => {
    const [data, setData] = useState<Order[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetchData();
            setData(response);
        })();
    }, []);

    const columns = useMemo<Column<Order>[]>(() => {
        return [
            {
                accessor: 'code',
                Header: 'Order No.',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    style: { width: '19rem' }
                }
            },
            {
                accessor: 'timestamp',
                Header: 'Order date',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left'
                    // style: { width: '30rem' }
                },
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return formatDate(value, 'MMM do, yyyy');
                }
            },
            {
                accessor: 'cost',
                Header: 'Order total',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    sx: { width: '23rem' }
                },
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return <PriceFormatText value={value} />;
                }
            },
            {
                id: 'expander',
                Header: '',
                MuiCellProps: {
                    align: 'right',
                    padding: 'action',
                    sx: { width: '16rem' }
                },
                Cell: (cellProps: CellProps<Order>) => {
                    const { row } = cellProps;
                    const { title, ...rowExpanderProps } = row?.getToggleRowExpandedProps
                        ? row.getToggleRowExpandedProps()
                        : ({} as TableExpandedToggleProps);

                    const { expanded } = useMuiCustomReactTableRow();

                    const endIconElement = <Icon fontSize="large">{expanded ? <ChevronUpSvg /> : <ChevronDownSvg />}</Icon>;

                    return (
                        <>
                            <Button className="order__detailBtn-desktop" variant="text" endIcon={endIconElement} {...rowExpanderProps}>
                                Details
                            </Button>
                            <IconButton className="order__detailBtn-mobile" size="large" {...rowExpanderProps}>
                                {endIconElement}
                            </IconButton>
                        </>
                    );
                },
                ExpandedRowContent: (row) => {
                    return (
                        <>
                            <OrderDetails className="expanded-table__expanded-content" />
                        </>
                    );
                }
            }
        ];
    }, []);

    return (
        <>
            <ShowOrdersForm />

            <MuiCustomReactTable
                columns={columns}
                data={data}
                // initialState={{ expanded: { '1': true } }}
                striped
                size="large"
                enableSort
                enableRowExpand
                className="expanded-table"
            />

            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: '8.6rem' }} spacing={6}>
                <Pagination count={10} defaultPage={6} />
            </Stack>
        </>
    );
};
