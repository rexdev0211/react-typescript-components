import React from 'react';

import clsx from 'clsx';
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Tab, TextField } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CancelIcon from '@mui/icons-material/Cancel';

interface DialogProps {
    open: boolean;
    handleClose: () => void;
}

export const RequestRefundDialog = ({ open, handleClose }: DialogProps) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Dialog className={clsx('order__request-refund-dialog', 'order__dialog')} open={open} onClose={handleClose} style={{ width: '1fr' }}>
            <DialogTitle>
                <span>Request refund for order 94812-41</span>
                <IconButton aria-label="delete" size="small" sx={{ color: 'aliceblue' }} onClick={handleClose}>
                    <CancelIcon fontSize="large" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h2" component="div" sx={{ mb: 10 }}>
                    Order total £2315
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Full refund" value="1" />
                                <Tab label="Partial refund" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { mb: 10, mt: 10 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    fullWidth
                                    id="outlined-number"
                                    label="Enter amount of refund"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows={5}
                                    defaultValue="Write a message to supplier about a refund"
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Typography variant="h4" gutterBottom component="div" sx={{ mt: 10 }}>
                                You are going to request a refund of £2315
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { mb: 10, mt: 10 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows={5}
                                    defaultValue="Write a message to supplier about a refund"
                                />
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
};
