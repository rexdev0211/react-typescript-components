import React from 'react';

import { useRouter } from 'next/router';
import { Button, Menu, MenuItem, Divider, Avatar } from '@mui/material';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import { useAuth } from '~/contexts/auth';

export const HeaderUserDropdown = () => {
    const popupState = usePopupState({ popupId: 'profile-menu', variant: 'popover' });
    const { logout } = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        logout();
        router.push('/auth/signin');
    };

    return (
        <>
            <Button
                {...bindTrigger(popupState)}
                variant="text"
                color="inherit"
                className="header__actions-avatar"
            >
                <Avatar alt="Remy Sharp" src="/images/avatar.jfif" />
            </Button>

            <Menu
                {...bindMenu(popupState)}
                PaperProps={{ sx: { minWidth: '18rem' } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                onClick={popupState.close}
            >
                <MenuItem>Orders</MenuItem>
                <MenuItem>Messages</MenuItem>
                <MenuItem>Settings</MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </>
    );
};
