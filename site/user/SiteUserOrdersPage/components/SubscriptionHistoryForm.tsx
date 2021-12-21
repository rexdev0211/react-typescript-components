import React from 'react';

import { Stack, Button, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { CustomSwitch } from '~/mui-custom/CustomSwitch';

interface SubscriptionHistoryFormProps {
    hideSubscriptionHistory: () => void;
}
export const SubscriptionHistoryForm = ({ hideSubscriptionHistory }: SubscriptionHistoryFormProps) => {

    return (
        <>
            <Grid container sx={{ mt: 3 }}>
                <Grid className="order__subscriptionHistoryLeft" item xs={12} md={8} sx={{ mb: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Button startIcon={<ArrowBackIosNewIcon />} onClick={() => hideSubscriptionHistory()}>
                        Back
                    </Button>
                    <Typography variant="h5" component="div" sx={{ mb: 0 }}>
                        Subscription history of 94812
                    </Typography>
                    <div className="order__customSwitch-desktop">
                        <CustomSwitch value={true} label={`Enabled`} />
                    </div>
                </Grid>
                <Grid className="order__customSwitch-mobile" item xs={5} md={3} sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
                        <CustomSwitch value={true} label={`Enabled`} />
                </Grid>
                <Grid className="order__deleteSubscriptionBtn" item xs={7} md={4} sx={{ mb: 8 }}>
                    <Button variant="contained" startIcon={<DeleteIcon />}>
                        Delete subscription
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
