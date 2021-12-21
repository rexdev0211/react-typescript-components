import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PageLayout } from '~/components/layout/PageLayout';
import { NextCustomPageHead } from '~/next-custom/PageHead';

import { PreviewAddress } from './PreviewAddress';
import { AddressApi, AddressValues, AddresssesResponse } from '~/api/address.api';
import { CountryApi, ICountryPhoneCode } from '~/api/country.api';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';
import { useAuth } from '~/contexts/auth';

type Values = AddressValues;

export const SiteUserAddressesPage = () => {

    const { accessToken } = useAuth();

    const [addresses, setAddresses] = useState<Values[]>([]);
    const [countries, setCountries] = useState<ICountryPhoneCode[]>([]);

    useEffect(() => {
        async function loadAddresses() {
            if(accessToken) {
                try {
                    const countriesData = await CountryApi.getCountries();
                    console.log('countries', countriesData);
                    setCountries(countriesData);

                    const response = await AddressApi.getAddresses();
                    console.log('addresses', response);
                    if (response) {
                        setAddresses(response.results);
                    }
                } catch (e) {
                    console.log(e);
                } finally {

                }
            }
        }
        loadAddresses();
    }, [accessToken]);

    const getCountryName = (country_code: string) => {
        return countries.length > 0 ? countries.filter((value: ICountryPhoneCode) => country_code === value.iso2)[0].name : '';
    }

    const removeAddress = useCallback(
        async (addressId: string) => {
            try {
                if (addressId) {
                    const deleteResponse = await AddressApi.deleteAddress(addressId);
                    console.log('delete_response', deleteResponse);
                }
            } catch (e) {
                console.log(e);
            } finally {
                const response = await AddressApi.getAddresses();
                console.log('addresses', response);
                if (response) {
                    setAddresses(response.results);
                }
            }
        },
        []
    )

    return (
        <PageLayout>
            <NextCustomPageHead title="Addresses" description="Your addresses" />

            <Box className="address__box">
                <Typography variant="h2" className="address__title" component="div" sx={{ mb: 15 }}>
                    View your addresses
                </Typography>

                <Grid container spacing={15}>
                    <Grid item xs={12} md={4}>
                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            startIcon={<AddOutlinedIcon />}
                            style={{ borderStyle: 'dashed' }}
                            className="address__addAddressBtn"
                            href="/addresses/add"
                        >
                            Add address
                        </Button>
                    </Grid>
                    {addresses.map((address, index) => {
                        return (
                            <Grid item xs={12} md={4} key={index}>
                                <PreviewAddress
                                    addressId={address.id}
                                    title={address.displayName || 'Name of the address'}
                                    full_name={`${address.firstName} ${address.lastName}`}
                                    phone_number={address.mobile ? `Phone number: ${address.mobile}` : ''}
                                    address_line1={address.address_line1}
                                    address_line2={address.address_line2}
                                    city={address.state}
                                    zipcode={address.postal_code}
                                    country={getCountryName(address.country_code)}
                                    comment={address.delivery_comment}
                                    needSecurity={address.requires_security_code}
                                    showEditRemove={true}
                                    removeAddress={removeAddress}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </PageLayout>
    );
};
