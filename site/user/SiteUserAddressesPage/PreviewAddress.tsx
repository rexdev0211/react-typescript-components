import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material';
import { AddressApi, AddressValues } from '~/api/address.api';

interface PreviewProps {
    addressId?: string;
    title: string;
    full_name: string;
    phone_number: string;
    address_line1: string;
    address_line2: string;
    city: string;
    zipcode: string;
    country: string;
    comment: string;
    needSecurity: boolean;
    showEditRemove?: boolean;
    removeAddress?: (addressId: string) => void;
}

export const PreviewAddress = ({ addressId, title, full_name, phone_number, address_line1, address_line2, city, zipcode, country, comment, needSecurity, showEditRemove, removeAddress }: PreviewProps) => {

    const removeAddressById = () => {
        if (addressId && removeAddress) {
            removeAddress(addressId);
        }
    }

    return (
        <Card className="address__preview">
            <CardHeader
                title={title}
            >
            </CardHeader>
            <CardContent>
                <Typography variant="h5">
                    {full_name}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {phone_number}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {address_line1}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {address_line2}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {city}{zipcode ? `, ${zipcode}` : ''}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    {country}
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                    {comment ? `Delivery instructions: ${comment}` : ''}
                </Typography>
                {needSecurity && <Typography variant="subtitle2" gutterBottom component="div">
                    need a security code or a call box number to access this building
                </Typography>}
                {!!showEditRemove && (
                    <>
                        <Button color="secondary" href={`/addresses/edit/${addressId}`}>Edit</Button>
                        <Button color="secondary" onClick={removeAddressById}>Remove</Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
