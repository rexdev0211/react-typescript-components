import React, { useEffect, useMemo, useState } from 'react';

import formatDate from 'date-fns/format';
import { CellProps, Column } from 'react-table';
import { Icon, Pagination, Stack, Typography, IconButton } from '@mui/material';

import { MuiCustomReactTable } from '~/mui-custom/ReactTable';
import { CustomChartSvg, CustomEditReviewSvg, CustomInvoiceDownloadSvg } from '~/assets/svg-icons/custom';

import { SubscriptionHistoryForm } from '../components/SubscriptionHistoryForm';

const createSubscriptionHistoryData = (code: string, timestamp: number, status: boolean) => {
    return { code, timestamp, status };
};

type Order = ReturnType<typeof createSubscriptionHistoryData>;

const fetchData = async (): Promise<Order[]> => {
    return [
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), true),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), false),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), true),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), false),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), true),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), false),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), true),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), false),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), true),
        createSubscriptionHistoryData('94812-44 ', new Date().getTime(), true)
    ];
};

interface SubscriptionsHistoryProps {
    hideSubscriptionHistory: () => void;
}

export const SubscriptionHistory = ({ hideSubscriptionHistory }: SubscriptionsHistoryProps) => {
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
                accessor: 'timestamp',
                Header: 'Order date',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    style: { width: '30rem' }
                },
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return formatDate(value, 'MMM do, yyyy');
                }
            },
            {
                accessor: 'code',
                Header: 'No.',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    style: { width: '30rem' }
                }
            },
            {
                accessor: 'status',
                Header: 'Status',
                MuiCellProps: {
                    noWrap: true,
                    align: 'left',
                    sx: { width: '23rem' }
                },
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return (
                        <Typography variant="h6" sx={{ color: !!value ? '#000000' : '#FF0000' }}>
                            {!!value ? 'Success' : 'Failed'}
                        </Typography>
                    )
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
                Cell: () => {
                    return (
                        <Stack direction="row" justifyContent="flex-start" alignItems="center">
                            <IconButton aria-label="forums" size="large" color="primary">
                                <Icon fontSize="large"><CustomChartSvg /></Icon>
                            </IconButton>
                            <IconButton aria-label="bookmark" size="large" color="primary">
                                <Icon fontSize="large"><CustomEditReviewSvg /></Icon>
                            </IconButton>
                            <IconButton aria-label="bookmark" size="large" color="primary">
                                <Icon fontSize="large"><CustomInvoiceDownloadSvg /></Icon>
                            </IconButton>
                        </Stack>
                    );
                }
            }
        ];
    }, []);

    return (
        <>
            <SubscriptionHistoryForm
                hideSubscriptionHistory={hideSubscriptionHistory}
            />

            <MuiCustomReactTable
                columns={columns}
                data={data}
                // initialState={{ expanded: { '1': true } }}
                striped
                size="large"
                enableSort
                className="expanded-table"
            />

            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: '8.6rem' }} spacing={6}>
                <Pagination count={10} defaultPage={6} />
            </Stack>
        </>
    );
};
