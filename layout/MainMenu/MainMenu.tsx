import React from 'react';

import { Container } from '@mui/material';

import { MainMenuList } from './MainMenuList';

export const MainMenu = () => {
    return (
        <Container className="main-menu__container">
            <MainMenuList />
        </Container>
    );
};
