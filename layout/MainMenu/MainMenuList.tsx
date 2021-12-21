import React from 'react';
import { useRouter } from 'next/router';

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    CustomAddressesSvg,
    CustomMessagesSvg,
    CustomOrdersSvg,
    CustomPaymentsSvg,
    CustomReferralsSvg,
    CustomSecuritySvg
} from '~/assets/svg-icons/custom';

export const MainMenuList = () => {
    const router = useRouter();

    return (
        <List className="main-menu-list">
            <ListItemButton
                selected={router.pathname === '/orders'}
                className="main-menu-list__btn"
                component="a"
                href="/orders"
            >
                <ListItemIcon>
                    <CustomOrdersSvg />
                </ListItemIcon>
                <ListItemText primary="Your orders" secondary="Information about your orders" disableTypography={false} />
            </ListItemButton>
            <ListItemButton
                selected={router.pathname === '/profile'}
                className="main-menu-list__btn"
                component="a"
                href="/profile"
            >
                <ListItemIcon>
                    <CustomSecuritySvg />
                </ListItemIcon>
                <ListItemText
                    primary="Login & Security"
                    secondary="Change name, contact info, security settings"
                    disableTypography={false}
                />
            </ListItemButton>
            <ListItemButton
                selected={router.pathname === '/addresses' || router.pathname === '/addresses/add' || router.pathname === '/addresses/edit'}
                className="main-menu-list__btn"
                component="a"
                href="/addresses"
            >
                <ListItemIcon>
                    <CustomAddressesSvg />
                </ListItemIcon>
                <ListItemText primary="Your Addresses" secondary="Add or edit your addresses" disableTypography={false} />
            </ListItemButton>
            <ListItemButton
                selected={router.pathname === '/referrals'}
                className="main-menu-list__btn"
                component="a"
                href="/referrals"
            >
                <ListItemIcon>
                    <CustomReferralsSvg />
                </ListItemIcon>
                <ListItemText
                    primary="Referrals"
                    secondary="Analytics, earnings and you referral code"
                    disableTypography={false}
                />
            </ListItemButton>
            <ListItemButton
                selected={router.pathname === '/payments'}
                className="main-menu-list__btn"
                component="a"
                href="/payments"
            >
                <ListItemIcon>
                    <CustomPaymentsSvg />
                </ListItemIcon>
                <ListItemText primary="Your payments" secondary="Manage your payment methods" disableTypography={false} />
            </ListItemButton>
            <ListItemButton
                selected={router.pathname === '/messages'}
                className="main-menu-list__btn"
                component="a"
                href="/messages"
            >
                <ListItemIcon>
                    <CustomMessagesSvg />
                </ListItemIcon>
                <ListItemText
                    primary="Message center"
                    secondary="Your messages and notifications"
                    disableTypography={false}
                />
            </ListItemButton>
        </List>
    );
};
