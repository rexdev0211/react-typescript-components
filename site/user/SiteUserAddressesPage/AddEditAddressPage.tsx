import React, { useState, useEffect, useCallback } from 'react';

import { Divider, Grid, TextField, Box, Typography, Button, Checkbox, FormControlLabel, FormGroup, Autocomplete, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { NextCustomPageHead } from '~/next-custom/PageHead';
import { PageLayout } from '~/components/layout/PageLayout';
import { PreviewAddress } from './PreviewAddress';

import { CountryApi, ICountryPhoneCode, initialCountry } from '~/api/country.api';
import { AddressApi, AddressValues, initialAddress } from '~/api/address.api';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';

import { useAuth } from '~/contexts/auth';

interface AddEditAddressPageProps {
    addOrEdit: boolean;
    addressId?: string;
}

type Values = AddressValues;

export const AddEditAddressPage = ({ addOrEdit, addressId }: AddEditAddressPageProps) => {

    const { accessToken } = useAuth();

    const [address, setAddress] = useState<Values>(initialAddress);
    const [countries, setCountries] = useState<ICountryPhoneCode[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<ICountryPhoneCode>(initialCountry);
    const [comment, setComment] = useState<string>('');
    const [needSecurity, setNeedSecurity] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        async function loadApiData() {
            if(accessToken) {
                const countriesData = await CountryApi.getCountries();
                console.log('countries', countriesData);
                setCountries(countriesData);
            }
        }
        console.log('loadApiData');
        loadApiData();
    }, [accessToken]);

    useEffect(() => {
        async function loadAddressData() {
            if(accessToken) {
                if (!addOrEdit && addressId && countries.length > 0) {
                    // Edit - get Address Data
                    try {
                        const response = await AddressApi.getAddress(addressId);
                        console.log('getAddress', response);
                        if (response) {
                            setAddress(response);
                            setSelectedCountry(countries.filter((value: ICountryPhoneCode) => response.country_code === value.iso2)[0]);
                        }
                    } catch (e) {
                        console.log(e);
                    } finally {
                        console.log('Final');
                    }
                }
            }
        }
        console.log('loadAddressData');
        loadAddressData();
    }, [accessToken, addOrEdit, addressId, countries]);

    const handleSubmit = useCallback(
        async () => {
            if (submitting) {
                return;
            }
            console.log('handleSubmit');
            console.log('address', address);

            try {
                setSubmitting(true);
                setError(false);

                if (addOrEdit) {
                    // Add
                    const response = await AddressApi.addAddress(address);
                    console.log('response', response);
                    if (response) {
                        setSuccess(true);
                    }
                }
                else {
                    if (addressId) {
                        // Edit
                        const response = await AddressApi.updateAddress(address, addressId);
                        console.log('update_response', response);
                        if (response) {
                            setSuccess(true);
                        }
                    }
                }
            } catch (e) {
                setSubmitting(false);
                setError(true);
                if (e instanceof InvalidParamsError) {
                    // @TODO: Required an error message as an object to bind error to specific field.
                    setErrorMessage(e.message);
                } else {
                    setErrorMessage('Something wrong with server.');
                    console.log(e);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [address, addressId, addOrEdit, submitting]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value});
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.checked});
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="secondary" href="/addresses">
            Your addresses
        </Link>,
        <Typography key="2" color="text.primary">
            {addOrEdit ? 'Add new address' : 'Edit address'}
        </Typography>,
    ];

    return (
        <PageLayout>
            <NextCustomPageHead title={addOrEdit ? 'Add new address' : 'Edit address'} description={addOrEdit ? 'Add new address' : 'Edit address'} />

            <Box className="profile__container">

                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 5 }}
                >
                    {breadcrumbs}
                </Breadcrumbs>

                <Typography variant="h4" gutterBottom component="div">
                    {`${addOrEdit ? 'Add new address' : 'Edit "Business address"'}`}
                </Typography>

                <Grid container spacing={0}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom component="div">
                            {addOrEdit ? 'Enter' : 'Change'} your delivering information
                        </Typography>

                        <Divider />

                        <ValidatorForm
                            onSubmit={handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <Box sx={{ mt: 15 }}>
                                <TextValidator
                                    name="displayName"
                                    label="Name of the address"
                                    value={address.displayName}
                                    onChange={handleChange}
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </Box>

                            <Grid container spacing={10} sx={{ mt: 5 }}>
                                <Grid item xs={12} md={4}>
                                    <TextValidator
                                        name="firstName"
                                        label="First name"
                                        value={address.firstName}
                                        onChange={handleChange}
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextValidator
                                        name="lastName"
                                        id="profile-last-name"
                                        label="Last name"
                                        value={address.lastName}
                                        onChange={handleChange}
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextValidator
                                        name="mobile"
                                        label="Phone"
                                        value={address.mobile}
                                        onChange={handleChange}
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 15 }}>
                                <TextValidator
                                    name="address_line1"
                                    label="Address line 1"
                                    value={address.address_line1}
                                    onChange={handleChange}
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </Box>

                            <Box sx={{ mt: 15 }}>
                                <TextValidator
                                    name="address_line2"
                                    label="Address line 2"
                                    value={address.address_line2}
                                    onChange={handleChange}
                                    fullWidth
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                            </Box>

                            <Grid container spacing={10} sx={{ mt: 5 }}>
                                <Grid item xs={12} md={4}>
                                    <TextValidator
                                        name="state"
                                        label="City"
                                        value={address.state}
                                        onChange={handleChange}
                                        size="small"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        value={selectedCountry.name ? selectedCountry : null}
                                        onChange={(event: unknown, newValue: ICountryPhoneCode | null) => {
                                            setAddress({...address, country_code: newValue ? newValue.iso2 : ''});
                                            setSelectedCountry(newValue ? newValue : initialCountry);
                                        }}
                                        className="address__countrySelect"
                                        fullWidth
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) => option.name ? option.name : ''}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Country"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextValidator
                                        name="postal_code"
                                        label="Zip code"
                                        value={address.postal_code}
                                        onChange={handleChange}
                                        size="small"
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>
                            </Grid>

                            <Box>
                                <TextField
                                    name="delivery_comment"
                                    label="Comment"
                                    multiline
                                    rows={4}
                                    sx={{ mt: 15 }}
                                    fullWidth
                                    value={address.delivery_comment}
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={{ mt: 10 }}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="requires_security_code"
                                                checked={address.requires_security_code}
                                                onChange={handleCheckboxChange}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label='"Do we need a security code or a call box number to access this building?"'
                                    />
                                </FormGroup>
                            </Box>

                            {success && <Typography variant="body1" gutterBottom color="primary">
                                {'Address saved successfully'}
                            </Typography>}

                            {error && <Typography variant="body1" gutterBottom color="error">
                                {errorMessage}
                            </Typography>}

                            <Grid item xs={12} md={6}>
                                <Button type="submit" variant="contained" size="large" id="profile-save" sx={{ mt: 30 }} fullWidth>
                                    Save changes
                                </Button>
                            </Grid>
                        </ValidatorForm>
                    </Grid>

                    <Grid item xs={12} md={4} className="profile__preview">
                        <Typography variant="h5" gutterBottom component="div" sx={{ paddingLeft: 10 }}>
                            Preview
                        </Typography>
                        <Divider />
                        <Box sx={{ mt: 15, pl: 15, pt: 5 }}>
                            <PreviewAddress
                                title={address.displayName || 'Name of the address'}
                                full_name={`${address.firstName} ${address.lastName}`}
                                phone_number={address.mobile ? `Phone number: ${address.mobile}` : ''}
                                address_line1={address.address_line1}
                                address_line2={address.address_line2}
                                city={address.state}
                                zipcode={address.postal_code}
                                country={selectedCountry.name}
                                comment={address.delivery_comment}
                                needSecurity={address.requires_security_code}
                                showEditRemove={false}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </PageLayout>
    );
};
