import React from 'react';

import clsx from 'clsx';
import { Stack, IconButton, Dialog, DialogContent, DialogTitle, Typography, Box, OutlinedInput, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { SearchBurgerSvg } from '~/assets/svg-icons/feather';

import QRCode from 'react-qr-code';

interface DialogProps {
    open: boolean;
    handleClose: () => void;
}

export const AuthenticationAppDialog = ({ open, handleClose }: DialogProps) => {

    return (
        <Dialog className={clsx('profile__authentication-app-dialog', 'order__dialog')} open={open} onClose={handleClose} style={{ width: '1fr' }}>
            <DialogTitle>
                <span>Connect authentication app</span>
                <IconButton aria-label="delete" size="small" sx={{ color: 'aliceblue' }} onClick={handleClose}>
                    <CancelIcon fontSize="large" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack
                    className="profile__authentication-app-dialog__stack"
                    direction={{ xs: 'row', sm: 'row' }}
                    spacing={ 10 }
                    alignItems="center"
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <QRCode
                            value="123456"
                            size={169}
                        />
                    </Box>
                    <Typography gutterBottom component="div" sx={{ fontSize: '1.8rem' }}>
                        Scan this QR Code. Use the Authenticator app to get free verfication codes, even when your phone is offline.
                        Available for Android and iPhone.
                    </Typography>
                </Stack>
                <OutlinedInput
                    type="text"
                    sx={{ mt: 15 }}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="close"
                            edge="end"
                            >
                            <SearchBurgerSvg />
                            </IconButton>
                        </InputAdornment>
                    }
                    autoFocus
                />
            </DialogContent>
        </Dialog>
    );
};
