import React, { useState } from 'react';

import { Stack, Button } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

import moment from 'moment';

import { CustomDateRangeDialog } from '~/mui-custom/CustomDateRangeDialog';

export const ShowOrdersForm = () => {

    const initDateRange = [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ];

    const [dateRange, setDateRange] = useState(initDateRange);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [open, setOpen] = useState(false);

    const handleSetDateRange = (range: React.SetStateAction<{ startDate: Date; endDate: Date; key: string; }[]>) => {
        setDateRange(range);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = () => {
        setStartDate(moment(dateRange[0].startDate).format('DD MMM'));
        setEndDate(moment(dateRange[0].endDate).format('DD MMM YYYY'));
        setOpen(false);
    };

    const clearRange = () => {
        setStartDate('');
        setEndDate('');
        setDateRange(initDateRange);
    }

    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ minHeight: '8.6rem' }} spacing={6}>
            <span className="order__showOrdersLabel">
                Show Orders
            </span>
            <Button startIcon={<DateRangeIcon />} onClick={handleClickOpen}>
                {startDate} - {endDate}
            </Button>
            <Button color="secondary" onClick={clearRange}>
                clear range
            </Button>

            <CustomDateRangeDialog
                open={open}
                dateRange={dateRange}
                handleClose={handleClose}
                handleApply={handleApply}
                handleSetDateRange={handleSetDateRange}
            />
        </Stack>
    );
};
