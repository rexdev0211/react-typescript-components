import React, { useState } from 'react';

import clsx from 'clsx';
import NextImage from 'next/image';
import { Button, Icon, Typography } from '@mui/material';

import { ProductSupplier } from '~/components/Product/ProductSupplier';
import { InfoSvg } from '~/assets/svg-icons/feather';
import {
    CustomCalendarAddSvg,
    CustomCalendarSvg,
    CustomChartSvg,
    CustomEditReviewSvg,
    CustomInvoiceDownloadSvg,
    CustomRefundSvg,
    CustomRepeatSvg
} from '~/assets/svg-icons/custom';

import { WriteReviewDialog } from './WriteReviewDialog';
import { RequestRefundDialog } from './RequestRefundDialog';
import { DownloadInvoiceDialog } from './DownloadInvoiceDialog';

interface SubscriptionDetailsProps {
    className: string;
    showSubscriptionHistory: () => void;
}

export const SubscriptionDetails = (props: SubscriptionDetailsProps) => {
    const { className, showSubscriptionHistory } = props;

    const [writeReviewDialogOpen, setWriteReviewDialogOpen] = useState(false);
    const [requestRefundDialogOpen, setRequestRefundDialogOpen] = useState(false);
    const [downloadInvoiceDialogOpen, setDownloadInvoiceDialogOpen] = useState(false);

    const handleWriteReviewDialogClose = () => {
        setWriteReviewDialogOpen(false);
    }

    const handleRequestRefundDialogClose = () => {
        setRequestRefundDialogOpen(false);
    }

    const handleDownloadInvoiceDialogClose = () => {
        setDownloadInvoiceDialogOpen(false);
    }

    return (
        <div className={clsx('expanded-order order', className)}>
            <div className="expanded-order__row expanded-order__row--main">
                <div className="order__product-img">
                    <NextImage
                        src="/images/product-pic1.jpg"
                        alt="Product Name"
                        objectFit="cover"
                        objectPosition="center"
                        width={160}
                        height={160}
                        quality={100}
                    />
                </div>
                <h3 className="order__product-title">Hire name long long long name</h3>
                <div className="order__product-details">
                    <Typography variant="inherit">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                    </Typography>
                    <ProductSupplier
                        className="order__product-supplier"
                        title="Supplier Name"
                        image="/images/supplier-pic.png"
                        rating={4.345}
                    />
                </div>
                <div className="order__price">£343/Day</div>
                <ul className="order__additional-list">
                    <li className="order__additional-item">
                        <div className="order__additional-img">
                            <NextImage
                                src="/images/product-pic2.jpg"
                                alt="Product Name"
                                objectFit="cover"
                                objectPosition="center"
                                width={70}
                                height={70}
                                quality={95}
                            />
                        </div>
                        <div className="order__additional-header">
                            <h6 className="order__additional-title">One time optional purchase</h6>
                            <span className="order__additional-desc">Description of the additional cost</span>
                        </div>
                        <div className="order__additional-sum">
                            <div className="order__additional-price">£52</div>
                            <div className="order__additional-qty">x 314</div>
                        </div>
                    </li>
                    <li className="order__additional-item">
                        <div className="order__additional-img">
                            <NextImage
                                src="/images/product-pic3.jpg"
                                alt="Product Name"
                                objectFit="cover"
                                objectPosition="center"
                                width={70}
                                height={70}
                                quality={95}
                            />
                        </div>
                        <div className="order__additional-header">
                            <h6 className="order__additional-title">Everyday addition</h6>
                            <span className="order__additional-desc">Description of the additional cost</span>
                            Everyday addition
                        </div>
                        <div className="order__additional-sum">
                            <div className="order__additional-price">£52/Day</div>
                            <div className="order__additional-qty">x 314</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="expanded-order__row expanded-order__row--inset expanded-order__row--delivery">
                <div className="order__schedule">
                    <div className="order__schedule-tbar">
                        <Button
                            variant="text"
                            className="order__schedule-btn--stretch"
                            startIcon={
                                <Icon fontSize="xlarge">
                                    <CustomCalendarSvg />
                                </Icon>
                            }
                        >
                            <div className="u-text-truncate">3 May 2021</div>
                        </Button>
                        <Button
                            variant="text"
                            className="order__schedule-btn"
                            startIcon={
                                <Icon fontSize="xlarge">
                                    <CustomRepeatSvg />
                                </Icon>
                            }
                        >
                            every week
                        </Button>
                    </div>
                    <Typography variant="note" className="order__schedule-note">
                        This order is booked every Sunday of each week, starting from 8 August 2021
                    </Typography>
                    <Button
                        variant="text"
                        className="order__schedule-btn"
                        startIcon={
                            <Icon fontSize="xxlarge">
                                <CustomCalendarAddSvg />
                            </Icon>
                        }
                        onClick={() => showSubscriptionHistory()}
                    >
                        Subscription history
                    </Button>
                </div>
                <div className="order__delivery">
                    <Typography variant="h5" gutterBottom>
                        Delivering information:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Full name
                    </Typography>
                    <Typography variant="body1">
                        <Typography variant="subtitle3">Phone number:</Typography>
                        <Typography variant="subtitle-secondary">+447458197652</Typography>
                    </Typography>
                    <Typography variant="body1">FLAT 7A HOUSE</Typography>
                    <Typography variant="body1">STREET LINE</Typography>
                    <Typography variant="body1">LONDON, S 8QZ</Typography>
                    <Typography variant="body1" gutterBottom>
                        United Kingdom
                    </Typography>
                    <Typography variant="body1">
                        <Typography variant="subtitle3">Delivery instructions:</Typography>
                        call me by phone 30 minutes before delivering
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center">
                        <Icon fontSize="small" sx={{ mr: 3 }} color="primary">
                            <InfoSvg />
                        </Icon>
                        Need a security code or a call box number to access this building
                    </Typography>
                </div>
                <div className="order__actions">
                    <Button
                        variant="text"
                        startIcon={
                            <Icon fontSize="xlarge">
                                <CustomChartSvg />
                            </Icon>
                        }
                    >
                        Message supplier
                    </Button>

                    <Button
                        variant="text"
                        startIcon={
                            <Icon fontSize="xlarge">
                                <CustomEditReviewSvg />
                            </Icon>
                        }
                        onClick={() => setWriteReviewDialogOpen(true)}
                    >
                        Write a review
                    </Button>
                    <WriteReviewDialog
                        open={writeReviewDialogOpen}
                        handleClose={handleWriteReviewDialogClose}
                    />

                    <Button
                        variant="text"
                        startIcon={
                            <Icon fontSize="xlarge">
                                <CustomRefundSvg />
                            </Icon>
                        }
                        onClick={() => setRequestRefundDialogOpen(true)}
                    >
                        Request a refund
                    </Button>
                    <RequestRefundDialog
                        open={requestRefundDialogOpen}
                        handleClose={handleRequestRefundDialogClose}
                    />

                    <Button
                        variant="text"
                        startIcon={
                            <Icon fontSize="xxlarge">
                                <CustomInvoiceDownloadSvg />
                            </Icon>
                        }
                        onClick={() => setDownloadInvoiceDialogOpen(true)}
                    >
                        Download invoice
                    </Button>
                    <DownloadInvoiceDialog
                        open={downloadInvoiceDialogOpen}
                        handleClose={handleDownloadInvoiceDialogClose}
                    />
                </div>
            </div>
            <div className="expanded-order__row expanded-order__row--inset">
                <div className="order__summary">Quantity: 12</div>
                <div className="order__summary order__summary--total">Total: £42315</div>
            </div>
        </div>
    );
};
