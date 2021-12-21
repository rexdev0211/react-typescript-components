import React from 'react';

import clsx from 'clsx';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';

interface DialogProps {
    open: boolean;
    handleClose: () => void;
}

export const DownloadInvoiceDialog = ({ open, handleClose }: DialogProps) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <Dialog className={clsx('order__request-refund-dialog', 'order__dialog')} open={open} onClose={handleClose} style={{ width: '1fr' }}>
            <DialogTitle>
                <span>Download invoice for order 94812-41</span>
                <IconButton aria-label="delete" size="small" sx={{ color: 'aliceblue' }} onClick={handleClose}>
                    <CancelIcon fontSize="large" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h2" component="div" sx={{ mb: 10 }}>
                    Order total £2315
                </Typography>
                <Typography variant="h2" component="div" sx={{ mb: 12 }}>
                    Refund £550
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Invoice</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Select Invoice"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Invoice - 28th August 2021</MenuItem>
                        <MenuItem value={2}>Invoice (refund) - 3rd September 2021</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>Download</Button>
            </DialogActions>
        </Dialog>
    );
};
