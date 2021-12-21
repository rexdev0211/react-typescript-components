import React, { useState } from 'react';

import { Stack, Button, Grid } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteIcon from '@mui/icons-material/Delete';

import moment from 'moment';

import { CustomDateRangeDialog } from '~/mui-custom/CustomDateRangeDialog';

export const SubscriptionsForm = () => {

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
        <>
            <Grid container sx={{ mt: 3 }}>
                <Grid item xs={12} md={7} sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
                    <span className="order__showSubscriptionsLabel">
                        Show Subscriptions
                    </span>
                    <Button startIcon={<DateRangeIcon />} onClick={handleClickOpen}>
                        {startDate} - {endDate}
                    </Button>
                    <Button color="secondary" onClick={clearRange}>
                        clear range
                    </Button>
                </Grid>
                <Grid className="order__deleteBtn" item xs={12} md={5} sx={{ mb: 8 }}>
                    <Button variant="contained" startIcon={<DeleteIcon />}>
                        Delete ALL subscriptions
                    </Button>
                </Grid>
            </Grid>

            <CustomDateRangeDialog
                open={open}
                dateRange={dateRange}
                handleClose={handleClose}
                handleApply={handleApply}
                handleSetDateRange={handleSetDateRange}
            />
        </>
    );
};
