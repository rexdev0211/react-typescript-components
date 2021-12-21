import React, { useState, useEffect, useCallback } from 'react';

import MuiPhoneNumber from 'material-ui-phone-number'

import NextImage from 'next/image';

import { Divider, Grid, TextField, Box, Typography, Autocomplete, Button, Stack, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SearchBurgerSvg } from '~/assets/svg-icons/feather';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { NextCustomPageHead } from '~/next-custom/PageHead';
import { PageLayout } from '~/components/layout/PageLayout';

import { AuthenticationAppDialog } from './AuthenticationAppDialog';
import { CustomSwitch } from '~/mui-custom/CustomSwitch';

import { CountryApi, ICountryPhoneCode, initialCountry } from '~/api/country.api';
import { UserApi, UserValues, initialUser } from '~/api/user.api';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';

import { useAuth } from '~/contexts/auth';

type Values = UserValues;

export const SiteUserProfilePage = () => {
    const { accessToken, user } = useAuth();

    const [userInfo, setUserInfo] = useState<Values>(initialUser);
    const [countries, setCountries] = useState<ICountryPhoneCode[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<ICountryPhoneCode>(initialCountry);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [oldPassword, setOldPassword] = useState<string>('');
    // const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
    const [openVATDialog, setOpenVATDialog] = useState(false);

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log('value', value);
            const newPassword = userInfo.password ? userInfo.password : '';
            console.log('newPassword', newPassword);
            if (value !== newPassword) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isPasswordMatchLength', (value) => {
            if (value.length > 0 && value.length < 8) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isPasswordValid', (value) => {
            if ( value.length > 0 && (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) ) {
                return false;
            }
            return true;
        });
    }, [userInfo.password]);

    useEffect(() => {
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, []);

    useEffect(() => {
        async function loadApiData() {
            if(accessToken) {
                const countriesData = await CountryApi.getCountries();
                console.log('countries', countriesData);
                setCountries(countriesData);
                if (user.id && countriesData.length > 0) {
                    // Edit - get User Data
                    try {
                        const response = await UserApi.getUser(user.id);
                        if (response) {
                            console.log('getUser', response);
                            setUserInfo(response);
                            if (response.tax.country_code) {
                                setSelectedCountry(countriesData.filter((value: ICountryPhoneCode) => response.tax.country_code.toUpperCase() === value.iso2)[0]);
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    } finally {
                        console.log('Final');
                    }
                }
            }
        }
        console.log('loadApiData');
        loadApiData();
    }, [accessToken, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value});
    }

    const handleChangePhone = (e) => {
        setUserInfo({ ...userInfo, mobile: { number: e.target.value } });
    }

    const handleChangeTaxNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, tax: { ...userInfo.tax, taxNumber: e.target.value } });
    }

    const handleSubmit = useCallback(
        async () => {
            if (submitting) {
                return;
            }
            console.log('handleSubmit');
            console.log('user', userInfo);
            try {
                setSubmitting(true);
                setError(false);
                if (userInfo.id) {
                    const response = await UserApi.updateUser(userInfo, userInfo.id);
                    console.log('update_response', response);
                    if (response) {
                        setUserInfo(response);
                        setSuccess(true);
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
        [userInfo, submitting]
    )

    const verifyVAT = () => {
        console.log('verifyVat', userInfo);
        setUserInfo({ ...userInfo, tax: { ...userInfo.tax, verified: true } });
    }

    const handleCloseVATDialog = () => {
      setOpenVATDialog(false);
    }

    const handleAuthenticatorAppEnable = () => {
        setOpenVATDialog(true);
    }

    return (
        <PageLayout>
            <NextCustomPageHead title="Profile Settings" description="Profile Settings" />

            <Box className="profile__container">
                <Typography variant="h4" gutterBottom component="div">
                    Profile settings
                </Typography>

                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={errors => console.log(errors)}
                >
                <Grid container spacing={0}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" gutterBottom component="div">
                            Edit personal information
                        </Typography>
                        <Divider />
                        <Box sx={{ mt: 15 }}>
                            <TextValidator
                                name="firstName"
                                label="First name"
                                value={userInfo.firstName}
                                onChange={handleChange}
                                fullWidth
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                name="lastName"
                                label="Last name"
                                value={userInfo.lastName}
                                onChange={handleChange}
                                fullWidth
                                validators={['required']}
                                errorMessages={['this field is required']}
                                sx={{ mt: 20 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item md={1} className="profile__column-divider">
                        <Typography variant="h5" gutterBottom component="div">
                            &nbsp;
                        </Typography>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} md={4} className="profile__column-contact">
                        <Typography variant="h5" gutterBottom component="div">
                            Edit contact information
                        </Typography>
                        <Divider />
                        <Box sx={{ mt: 15 }}>

                            <MuiPhoneNumber
                                defaultCountry={'us'}
                                value={userInfo.mobile.number}
                                onChange={handleChangePhone}
                                fullWidth
                            />
                            <TextValidator
                                name="email"
                                label="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                fullWidth
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                sx={{ mt: 20 }}
                            />
                        </Box>
                    </Grid>

                    <Grid item md={3} className="profile__column-divider">
                        <Typography variant="h5" gutterBottom component="div">
                            &nbsp;
                        </Typography>
                        <Divider />
                    </Grid>

                </Grid>

                <Grid container spacing={0} className="profile__settings-grid">
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" gutterBottom component="div">
                            Edit VAT ({userInfo.tax.verified ? 'verified' : 'verification required'})
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mt: 15 }}>
                            <Autocomplete
                                value={selectedCountry.name ? selectedCountry : null}
                                onChange={(event: unknown, newValue: ICountryPhoneCode | null) => {
                                    setUserInfo({...userInfo, tax: { ...userInfo.tax, country_code: newValue ? newValue.iso2 : ''} });
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
                            <Box sx={{ mt: 20 }}>
                                {!userInfo.tax.verified ?
                                <Stack
                                    direction={{ xs: 'row', sm: 'row' }}
                                    spacing={ 0 }
                                >
                                    <OutlinedInput
                                        className="profile__verifyField"
                                        type="text"
                                        value={userInfo.tax.taxNumber ? userInfo.tax.taxNumber : ''}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxNumber(e.target.value)}
                                        onChange={handleChangeTaxNumber}
                                        endAdornment={
                                            userInfo.tax.taxNumber && <InputAdornment position="end">
                                            <IconButton
                                              aria-label="close"
                                              onClick={() => setUserInfo({ ...userInfo, tax: { ...userInfo.tax, taxNumber: '' } })}
                                              edge="end"
                                            >
                                              <CloseIcon className="" />
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        fullWidth
                                    />
                                    <Button
                                        className="profile__verifyBtn"
                                        variant="contained"
                                        size="large"
                                        onClick={handleSubmit}>
                                        Verify
                                    </Button>
                                </Stack>
                                :
                                <OutlinedInput
                                    className="profile__verifyField"
                                    type="text"
                                    value={userInfo.tax.taxNumber ? userInfo.tax.taxNumber : ''}
                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxNumber(e.target.value)}
                                    onChange={handleChangeTaxNumber}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="close"
                                        onClick={() => setUserInfo({ ...userInfo, tax: {...userInfo.tax, verified: false} })}
                                        edge="end"
                                        >
                                            <SearchBurgerSvg />
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    fullWidth
                                />}

                                <AuthenticationAppDialog
                                    open={openVATDialog}
                                    handleClose={handleCloseVATDialog}
                                />

                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="profile__settings-grid">
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" gutterBottom component="div">
                            Change password
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box >
                            <TextValidator
                                label="Old password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                                name="oldPassword"
                                type="password"
                                validators={[]}
                                errorMessages={[]}
                                value={oldPassword}
                                fullWidth
                                sx={{ mt: 20 }}
                            />
                            <TextValidator
                                label="New password"
                                onChange={handleChange}
                                name="password"
                                type="password"
                                validators={['isPasswordMatchLength', 'isPasswordValid']}
                                errorMessages={['Minimum length is 8', 'Password must contain at least one letter and one number']}
                                value={userInfo.password ? userInfo.password : ''}
                                fullWidth
                                sx={{ mt: 20 }}
                            />
                            <TextValidator
                                label="Repeat password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordConfirm(e.target.value)}
                                name="newPasswordConfirm"
                                type="password"
                                validators={['isPasswordMatch']}
                                errorMessages={['password mismatch']}
                                value={newPasswordConfirm}
                                fullWidth
                                sx={{ mt: 20 }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="profile__settings-grid">
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" gutterBottom component="div">
                            Security settings
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={8}>
                    <Stack
                        direction={{ xs: 'row', sm: 'row' }}
                        spacing={ 15 }
                        sx={{ mt: 10 }}
                    >
                        <Box>
                            <NextImage
                                className="profile__authentication-img"
                                src="/images/profile-security.png"
                                alt="Security app"
                                objectFit="cover"
                                objectPosition="center"
                                width={100}
                                height={100}
                                quality={100}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" gutterBottom component="div">
                                Authenticator App
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                Use the Authentication app to get free verification codes, even when your phone is offline.
                                Available for Android and Phone.
                            </Typography>
                            <CustomSwitch value={false} label={`Enabled`} handleEnable={handleAuthenticatorAppEnable} />
                        </Box>
                    </Stack>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={12} md={4} sx={{ mt: 50 }}>

                        {success && <Typography variant="body1" gutterBottom color="primary">
                            {'User saved successfully'}
                        </Typography>}

                        {error && <Typography variant="body1" gutterBottom color="error">
                            {errorMessage}
                        </Typography>}

                        <Button type="submit" variant="contained" size="large" id="profile-save" fullWidth>
                            Save changes
                        </Button>
                    </Grid>
                </Grid>
                </ValidatorForm>
            </Box>
        </PageLayout>
    );
};
