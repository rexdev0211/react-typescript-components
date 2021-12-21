import React from 'react';

import { Container, Grid } from '@mui/material';
import { SubHeaderLocationField } from './SubHeaderLocationField';
import { SubHeaderSearchField } from './SubHeaderSearchField';
import { SubHeaderCategoryList } from './SubHeaderCategoryList';

export const SubHeader = () => {
    return (
        <div className="sub-header">
            <Container className="sub-header__container">
                <Grid container spacing={15}>
                    <Grid item xs={6} sm={3}>
                        <SubHeaderLocationField defaultValue="London" />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <SubHeaderSearchField className="sub-header__searchInput" placeholder="Search" />
                    </Grid>
                </Grid>
                <div className="sub-header__category">
                    <SubHeaderCategoryList />
                </div>
            </Container>
        </div>
    );
};
