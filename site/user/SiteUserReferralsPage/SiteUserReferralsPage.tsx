import React, { useState } from 'react';
import { Box, Typography, Divider, Grid, Button, Stack, TextField, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { PageLayout } from '~/components/layout/PageLayout';
import { NextCustomPageHead } from '~/next-custom/PageHead';

export const SiteUserReferralsPage = () => {
    const referralChartsData = [
        {
            "day": "March 25",
            "referrals": 30
        },
        {
            "day": "March 30",
            "referrals": 40
        },
        {
            "day": "April 5",
            "referrals": 33
        },
        {
            "day": "April 10",
            "referrals": 58
        },
        {
            "day": "April 15",
            "referrals": 60
        },
        {
            "day": "April 20",
            "referrals": 65
        },
        {
            "day": "April 25",
            "referrals": 85
        },
        {
            "day": "April 30",
            "referrals": 40
        },
        {
            "day": "May 5",
            "referrals": 40
        },
        {
            "day": "May 15",
            "referrals": 57
        },
        {
            "day": "May 20",
            "referrals": 60
        },
        {
            "day": "May 25",
            "referrals": 65
        },
    ];

    const [period, setPeriod] = useState('d');

    const handleChange = (event: SelectChangeEvent) => {
        setPeriod(event.target.value);
    };

    return (
        <PageLayout>
            <NextCustomPageHead title="Referrals" description="Your Referrals" />

            <Box className="referral__box">
                <Typography variant="h2" gutterBottom className="referral__title" component="div">
                    Referrals
                </Typography>

                <Box sx={{ mb: 30 }}>
                    <Typography variant="h4" gutterBottom className="referral__subtitle" component="div">
                        Share your referral code to start collecting earnings
                    </Typography>
                    <Divider sx={{ mb: 15 }} />

                    <Grid container spacing={15}>
                        <Grid item xs={12} md={5}>
                            <Stack
                                direction="row"
                                spacing={ 0 }
                                sx={{ mb: 5 }}
                            >
                                <TextField
                                    value={"HDF75N3KDS8ASDNH3"}
                                    fullWidth
                                    className="form__groupLeftField"
                                />
                                <Button className="form__groupRightButton" variant="contained" size="large" >
                                    Copy
                                </Button>
                            </Stack>
                            <Button color="secondary" href="#">Terms and conditions</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mb: 30 }}>
                    <Typography variant="h4" gutterBottom className="referral__title" component="div">
                        Analytics
                    </Typography>
                    <Divider sx={{ mb: 5 }} />

                    <Grid container spacing={15} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={4}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={ 0 }
                                sx={{ mb: 5 }}
                            >
                                <Typography variant="h5" className="referral__subtitle" component="div">
                                    Referral statistics
                                </Typography>
                                <FormControl sx={{ minWidth: 100 }}>
                                    <Select
                                        className="referral__customSelect"
                                        value={period}
                                        onChange={handleChange}
                                        displayEmpty
                                        size="small"
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={'d'}>Daily</MenuItem>
                                        <MenuItem value={'w'}>Weekly</MenuItem>
                                        <MenuItem value={'m'}>Monthly</MenuItem>
                                        <MenuItem value={'y'}>Yearly</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>

                    <div style={{ width: '100%', height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={referralChartsData}
                                margin={{
                                    left: -30,
                                }}
                            >
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Area dataKey="referrals" stroke="#AD57A0" fill="#36B4C4" />
                                <Tooltip />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <Grid container spacing={15}>
                        <Grid item xs={12} md={6}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={ 0 }
                            >
                                <Typography variant="h5" className="referral__subtitle" component="div" sx={{ mt: 5 }}>
                                    Total referrals: 563
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mb: 30 }}>
                    <Typography variant="h4" gutterBottom className="referral__title" component="div">
                        Earnings
                    </Typography>
                    <Divider sx={{ mb: 15 }} />

                    <Grid container spacing={15}>
                        <Grid item xs={12} md={6}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={ 0 }
                                sx={{ mb: 5 }}
                            >
                                <Typography variant="h5" gutterBottom className="referral__subtitle" component="div">
                                    Balance: £600
                                </Typography>
                                <Typography variant="h5" gutterBottom className="referral__subtitle" component="div">
                                    Lifetime earnings: £7300
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container spacing={15}>
                        <Grid item xs={12} md={5}>
                            <Stack
                                direction="row"
                                spacing={ 0 }
                                sx={{ mb: 5 }}
                            >
                                <TextField
                                    type="number"
                                    value={"150"}
                                    fullWidth
                                    className="form__groupLeftField"
                                />
                                <Button className="form__groupRightButton" variant="contained" size="large" >
                                    Withdraw
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </PageLayout>
    );
};
