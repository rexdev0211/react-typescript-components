import React, { useMemo, useState } from 'react';

import { useEventCallback } from '@mui/material';

import { SignUpFormFlowItemType, SignUpFormFlowContext, SignUpFormFlowContextValue } from './SignUpFormFlowContext';

export interface SignUpFormFlowItemProps {
    value: SignUpFormFlowItemType;
}

export type SignUpFormFlowProviderProps = {
    children: React.ReactElement<SignUpFormFlowItemProps>[] | React.ReactElement<SignUpFormFlowItemProps>;
    defaultValue?: SignUpFormFlowItemType;
};

export const SignUpFormFlowProvider = (props: SignUpFormFlowProviderProps) => {
    const { children, defaultValue } = props;
    const [activeItem, setActiveItem] = useState(defaultValue);
    const [sessionId, setSessionId] = useState<SignUpFormFlowContextValue['sessionId']>();
    const [mobileNumber, setMobileNumber] = useState<SignUpFormFlowContextValue['mobileNumber']>();
    const [countryCode, setCountryCode] = useState<SignUpFormFlowContextValue['countryCode']>();
    const [verifyCode, setVerifyCode] = useState<SignUpFormFlowContextValue['verifyCode']>();

    const childElements = React.Children.toArray(children) as React.ReactElement<SignUpFormFlowItemProps>[];

    const handleMoveTo = useEventCallback((value: SignUpFormFlowItemType) => {
        setActiveItem(value);
    });

    const handleUpdateSessionId = useEventCallback((value: string) => {
        setSessionId(value);
    });

    const handleUpdateMobileNumber = useEventCallback((value: string) => {
        setMobileNumber(value);
    });

    const handleUpdateCountryCode = useEventCallback((value: string) => {
        setCountryCode(value);
    });

    const handleUpdateVerifyCode = useEventCallback((value: string) => {
        setVerifyCode(value);
    });

    const contextValue = useMemo<SignUpFormFlowContextValue>(
        () => ({
            sessionId,
            mobileNumber,
            countryCode,
            verifyCode,
            moveTo: handleMoveTo,
            updateSessionId: handleUpdateSessionId,
            updateMobileNumber: handleUpdateMobileNumber,
            updateCountryCode: handleUpdateCountryCode,
            updateVerifyCode: handleUpdateVerifyCode
        }),
        [handleMoveTo, handleUpdateSessionId, sessionId, handleUpdateMobileNumber, mobileNumber, handleUpdateCountryCode, countryCode, handleUpdateVerifyCode, verifyCode]
    );

    let activeElement: React.ReactElement | null = null;

    if (!activeItem) {
        activeElement = childElements[0];
    } else {
        activeElement =
            childElements.find((child) => {
                if (child.props.value === activeItem) {
                    return child;
                }
            }) || null;
    }

    return <SignUpFormFlowContext.Provider value={contextValue}>{activeElement}</SignUpFormFlowContext.Provider>;
};
