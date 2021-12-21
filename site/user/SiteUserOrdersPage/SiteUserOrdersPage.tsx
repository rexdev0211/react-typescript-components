import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { PageLayout } from '~/components/layout/PageLayout';
import { NextCustomPageHead } from '~/next-custom/PageHead';
import { OnGoingOrdersTable } from './OnGoingOrders';
import { PastOrdersTable } from './PastOrders';
import { SubscriptionsTable, SubscriptionHistory } from './Subscriptions';

export const SiteUserOrdersPage = () => {
    const [value, setValue] = useState<string>('ongoing');
    const [subscriptionHistoryShow, setSubscriptionHistoryShow] = useState<boolean>(false);

    const showSubscriptionHistory = () => {
        setSubscriptionHistoryShow(true);
    }

    const hideSubscriptionHistory = () => {
        setSubscriptionHistoryShow(false);
    }

    const handleTabsChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <PageLayout>
            <NextCustomPageHead title="Orders" description="Your orders" />

            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleTabsChange} aria-label="lab API tabs example" variant="scrollable">
                        <Tab value="ongoing" label="On-Going Orders" />
                        <Tab value="past" label="Past Orders" />
                        <Tab value="subscriptions" label="Subscriptions" />
                    </TabList>
                </Box>
                <TabPanel value="ongoing">
                    <OnGoingOrdersTable />
                </TabPanel>
                <TabPanel value="past">
                    <PastOrdersTable />
                </TabPanel>
                <TabPanel value="subscriptions">
                    {!subscriptionHistoryShow
                        ?
                        <SubscriptionsTable
                            showSubscriptionHistory={showSubscriptionHistory}
                        />
                        :
                        <SubscriptionHistory
                            hideSubscriptionHistory={hideSubscriptionHistory}
                        />
                    }
                </TabPanel>
            </TabContext>
        </PageLayout>
    );
};
