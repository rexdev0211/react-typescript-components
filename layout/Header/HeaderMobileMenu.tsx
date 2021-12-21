import React, {useState} from 'react';

import { Button, Icon, Avatar, Divider } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import { ShoppingCartSvg } from '~/assets/svg-icons/feather';
import { CustomHamburgerSvg } from '~/assets/svg-icons/custom';
import { CustomOrdersSvg, CustomMessagesSvg, CustomSecuritySvg } from '~/assets/svg-icons/custom';

export type HeaderProps = React.ComponentPropsWithoutRef<'header'>;

export const HeaderMobileMenu = (props: HeaderProps) => {
    const { className } = props;
    const [open, setOpen] = useState(false);

    return (
        <div className={className}>
            <div className="header__mobile__hamburger" onClick={() => setOpen(!open)}>
                <Icon fontSize="large">
                    <CustomHamburgerSvg />
                </Icon>
            </div>
            <ul className={`${!open && 'opened'} header__actions`}>
                <li className="header__actions-item" style={{ width: '100%' }}>
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-avatar"
                    >
                        <Avatar alt="Remy Sharp" src="/images/avatar.jfif" />
                    </Button>
                </li>
                <li className="header__actions-item">
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-btn"
                        startIcon={
                            <Icon fontSize="large">
                                <HelpOutline />
                            </Icon>
                        }
                    >
                        Help
                    </Button>
                </li>
                <li className="header__actions-item">
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-btn"
                        startIcon={
                            <Icon fontSize="large">
                                <ShoppingCartSvg />
                            </Icon>
                        }
                    >
                        Basket
                    </Button>
                </li>

                <li className="header__actions-item">
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-btn"
                        startIcon={
                            <Icon fontSize="large">
                                <CustomOrdersSvg />
                            </Icon>
                        }
                    >
                        Orders
                    </Button>
                </li>
                <li className="header__actions-item">
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-btn"
                        startIcon={
                            <Icon fontSize="large">
                                <CustomMessagesSvg />
                            </Icon>
                        }
                    >
                        Messages
                    </Button>
                </li>
                <li className="header__actions-item">
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-btn"
                        startIcon={
                            <Icon fontSize="large">
                                <CustomSecuritySvg />
                            </Icon>
                        }
                    >
                        Settings
                    </Button>
                </li>

                <Divider sx={{ width: '100%' }} />

                <li className="header__actions-item">
                    <Button
                        variant="text"
                        color="inherit"
                        className="header__actions-btn"
                        startIcon={
                            <LogoutIcon />
                        }
                    >
                        Sign Out
                    </Button>
                </li>
            </ul>
        </div>
    );
};
