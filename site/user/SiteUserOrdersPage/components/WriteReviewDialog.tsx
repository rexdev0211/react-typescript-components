import React, { useState } from 'react';

import clsx from 'clsx';
import NextImage from 'next/image';
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, Rating } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';

import { CustomImageList } from '~/mui-custom/CustomImageList';
import { UploadButton } from '~/mui-custom/UploadButton';

const labels: { [index: string]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

interface DialogProps {
    open: boolean;
    handleClose: () => void;
}
const itemData = [
    {
        img: '/images/product-pic1.jpg',
        title: 'Breakfast',
    },
    {
        img: '/images/product-pic2.jpg',
        title: 'Breakfast',
    },
    {
        img: '/images/product-pic3.jpg',
        title: 'Breakfast',
    },
];

export const WriteReviewDialog = ({ open, handleClose }: DialogProps) => {

    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);

    return (
        <Dialog className={clsx('order__write-review-dialog', 'order__dialog')} open={open} onClose={handleClose}>
            <DialogTitle>
                <span>Write a review</span>
                <IconButton aria-label="delete" size="small" sx={{ color: 'aliceblue' }} onClick={handleClose}>
                    <CancelIcon fontSize="large" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className="order__product-section">
                    <div className="order__product-img">
                        <NextImage
                            src="/images/product-pic1.jpg"
                            alt="Product Name"
                            objectFit="cover"
                            objectPosition="center"
                            width={100}
                            height={100}
                            quality={100}
                        />
                    </div>
                    <div className="order__product-text">
                        <h3 className="order__product-title">Timed service name</h3>
                        <div className="order__product-details">
                            <Typography variant="inherit">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="order__rate-product">
                    <Typography variant="h5" gutterBottom component="div">
                        Rate this product:
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '3rem',
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            size="large"
                            value={value}
                            precision={1}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 10 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                    <TextField
                        label="Your review"
                        fullWidth
                        multiline
                        rows={4}
                        helperText="Tell us what you think about this product"
                        defaultValue="Good timed services, but not perfect"
                    />
                </div>
                <div className="order__image-list">
                    <Box sx={{ display: 'flex', mb: 10 }}>
                        <CustomImageList itemData={itemData} />
                    </Box>
                    <Box>
                        <UploadButton />
                    </Box>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
