import React from 'react';
import clsx from 'clsx';

import { Badge, Button, Container, Icon } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';

import { NextCustomPageLink } from '~/next-custom/PageLink';
import { BrandWhite32Svg } from '~/assets/svg-icons/brand';
import { ShoppingCartSvg } from '~/assets/svg-icons/feather';
import { appConfig } from '~/config/app.config';

import { HeaderUserDropdown } from './HeaderUserDropdown';
import { HeaderMobileMenu } from './HeaderMobileMenu';

export type HeaderProps = React.ComponentPropsWithoutRef<'header'>;

export const Header = (props: HeaderProps) => {
    const { className, ...other } = props;

    return (
        <header {...other} className={clsx('header', className)}>
            <Container className="header__container">
                <NextCustomPageLink href={appConfig.urls.home()} componentProps={{ className: 'header__brand-link' }}>
                    <BrandWhite32Svg className="header__brand" />
                </NextCustomPageLink>

                <HeaderMobileMenu className="header__mobile" />

                <div className="header__desktop">
                    <ul className="header__actions">
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
                                    <Badge color="primary" badgeContent={7}>
                                        <Icon fontSize="large">
                                            <ShoppingCartSvg />
                                        </Icon>
                                    </Badge>
                                }
                            >
                                Basket
                            </Button>
                        </li>
                        <li className="header__actions-item__desktop">
                            <HeaderUserDropdown />
                        </li>
                    </ul>
                </div>
            </Container>
        </header>
    );
};
