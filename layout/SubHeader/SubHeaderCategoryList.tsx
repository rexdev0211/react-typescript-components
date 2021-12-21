import React from 'react';

import { Box, Link } from '@mui/material';

export const SubHeaderCategoryList = () => {
    return (
        <Box className="sub-header__categoryList">
            <Link href="#" underline="none">Home</Link>
            <Link href="#" underline="none">Waste removal </Link>
            <Link href="#" underline="none">Hazardous waste </Link>
            <Link href="#" underline="none">Aggregates </Link>
            <Link href="#" underline="none">Building services</Link>
            <Link href="#" underline="none">Plant hire </Link>
            <Link href="#" underline="none">Man and van </Link>
            <Link href="#" underline="none">Wait and load</Link>
            <Link href="#" underline="none">Quoted services</Link>
        </Box>
    );
};
