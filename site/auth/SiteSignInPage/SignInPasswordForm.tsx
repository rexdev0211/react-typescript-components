import React, { useCallback, useRef, useState } from 'react';

import Router from 'next/router';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import { Button, CircularProgress, Icon, Link } from '@mui/material';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useMountedRef } from '~/mui-custom/utils';
import { AuthForm, AuthFormFooter, AuthFormHeader } from '~/components/AuthForm';
import { FormRow } from '~/components/FormRow';
import { PasswordField } from '~/components/Field/PasswordField';
import { appConfig } from '~/config/app.config';
import { AuthApi, IAuthSignInByPasswordValues } from '~/api/auth.api';

import { SignInFormFlowItemType, useSignInFormFlow } from './SignInFormFlowContext';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';
import { useAuth } from '~/contexts/auth';

export interface SignInPasswordFormProps extends React.ComponentPropsWithoutRef<'form'> {
    value: SignInFormFlowItemType;
}

// type Values = Omit<IAuthSignInByPasswordValues, 'sessionId'>;

export interface Values {
    password: string;
}

const initialValues: Values = { password: '' };

const validationSchema: Yup.SchemaOf<Values> = Yup.object({
    password: Yup.string().min(8, 'At least ${min} characters long required.').required('This field is required.')
});

export const SignInPasswordForm = (props: SignInPasswordFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const { sessionId, verifyCode } = useSignInFormFlow();
    const formikRef = useRef<FormikProps<Values>>(null);
    const mountedRef = useMountedRef();

    const { login } = useAuth();

    const handleSubmit = useCallback(
        async (values: Values, helpers: FormikHelpers<Values>) => {
            if (submitting || !sessionId || !verifyCode) {
                return;
            }

            try {
                setSubmitting(true);

                const response = await AuthApi.signInByPassword({ ...values, mobile: {number: sessionId}, code: verifyCode });

                console.log('signInByPassword_response', response);

                if (response.tokens) {
                    await login(response);
                    Router.push('/orders');
                }

                if (mountedRef.current) {
                    setSubmitting(false);
                    helpers.resetForm();
                }
            } catch (e) {
                setSubmitting(false);
                if (e instanceof InvalidParamsError && mountedRef.current) {

                    helpers.setErrors({
                        password: e.message
                    });
                } else {
                    helpers.setErrors({
                        password: 'Incorrect password or verification code.'
                    });
                    console.log(e);
                }
            }
        },
        [sessionId, submitting, mountedRef]
    );

    const handleNextClick = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    }, []);

    return (
        <Formik
            validateOnMount={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            {(formikProps) => {
                const { dirty, isValid } = formikProps;
                const isButtonDisabled = !dirty || (dirty && !isValid) || submitting;

                return (
                    <AuthForm {...props}>
                        <AuthFormHeader title="Welcome back" />
                        <FormRow>
                            <PasswordField
                                name="password"
                                label="Password"
                                helperText="Please enter your password to sign in."
                                required
                                fullWidth
                                autoFocus
                            />
                        </FormRow>
                        <FormRow>
                            <Button
                                variant={isButtonDisabled ? 'contrast' : 'contained'}
                                color={isButtonDisabled ? 'inherit' : 'primary'}
                                size="large"
                                fullWidth
                                disabled={isButtonDisabled}
                                {...(submitting && {
                                    startIcon: (
                                        <Icon>
                                            <CircularProgress color="inherit" />
                                        </Icon>
                                    )
                                })}
                                onClick={handleNextClick}
                            >
                                SIGN IN
                            </Button>
                        </FormRow>

                        <AuthFormFooter>
                            <NextLink href={appConfig.urls.forgotPassword()} passHref>
                                <Link>Forgot Password?</Link>
                            </NextLink>
                        </AuthFormFooter>
                    </AuthForm>
                );
            }}
        </Formik>
    );
};
