import React from 'react';

import { Container, Alert } from '@mui/material';

export const Notification = () => {
    return (
        <Container className="notification">
            <Alert icon={false} className="notification__alert">
                Welcome, John Doe!
            </Alert>
        </Container>
    );
};
