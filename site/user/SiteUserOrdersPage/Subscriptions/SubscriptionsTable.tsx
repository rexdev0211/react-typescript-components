import React, { useEffect, useMemo, useState } from 'react';

import { CellProps, Column, TableExpandedToggleProps } from 'react-table';
import { Button, Icon, Pagination, Stack } from '@mui/material';

import { PriceFormatText } from '~/components/FormatInput';
import { MuiCustomReactTable, useMuiCustomReactTableRow } from '~/mui-custom/ReactTable';
import { CustomSwitch } from '~/mui-custom/CustomSwitch';
import { ChevronDownSvg, ChevronUpSvg } from '~/assets/svg-icons/feather';

import { SubscriptionDetails } from '../components/SubscriptionDetails';
import { SubscriptionsForm } from '../components/SubscriptionsForm';

const createSubscriptionData = (code: string, timestamp: string, frequency:string, cost: number, enabled: boolean) => {
    return { code, timestamp, frequency, cost, enabled };
};

type Order = ReturnType<typeof createSubscriptionData>;

const fetchData = async (): Promise<Order[]> => {
    return [
        createSubscriptionData('94812-44 ', 'Every Monday', 'Week', 532.54, true),
        createSubscriptionData('94812-44 ', 'Every 4th of each month', 'Month', 532.54, false),
        createSubscriptionData('94812-44 ', 'Every 15th of each 3rd month', '3 Months', 532.54, true),
        createSubscriptionData('94812-44 ', 'Every 21st February of each year', 'Year', 82315, false),
        createSubscriptionData('94812-44 ', 'Every Sunday', 'Week', 532.54, false),
        createSubscriptionData('94812-44 ', 'Every Sunday', 'Week', 532.54, false),
        createSubscriptionData('94812-44 ', 'Every Sunday', 'Week', 532.54, true),
        createSubscriptionData('94812-44 ', 'Every Sunday', 'Week', 532.54, false),
        createSubscriptionData('94812-44 ', 'Every Sunday', 'Week', 532.54, true),
        createSubscriptionData('94812-44 ', 'Every Sunday', 'Week', 532.54, true)
    ];
};

interface SubscriptionsTableProps {
    showSubscriptionHistory: () => void;
}

export const SubscriptionsTable = ({ showSubscriptionHistory }: SubscriptionsTableProps) => {
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
                Header: 'Date',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left'
                    // style: { width: '30rem' }
                },
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return value;
                }
            },
            {
                accessor: 'frequency',
                Header: 'Frequency',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    style: { width: '19rem' }
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
                accessor: 'enabled',
                Header: 'Enabled',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    sx: { width: '23rem' }
                },
                Cell: (cellProps) => {
                    const { value } = cellProps;
                    console.log('value', value);

                    // return <span>aaa</span>
                    return <CustomSwitch value={value} />;
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

                    const endIconElement = <Icon fontSize="small">{expanded ? <ChevronUpSvg /> : <ChevronDownSvg />}</Icon>;

                    return (
                        <Button variant="text" endIcon={endIconElement} {...rowExpanderProps}>
                            Details
                        </Button>
                    );
                },
                ExpandedRowContent: (row) => {
                    return (
                        <>
                            <SubscriptionDetails
                                className="expanded-table__expanded-content"
                                showSubscriptionHistory={showSubscriptionHistory}
                            />
                        </>
                    );
                }
            }
        ];
    }, []);

    return (
        <>
            <SubscriptionsForm />

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
