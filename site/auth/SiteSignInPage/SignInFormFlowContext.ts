import { createCtx } from '~/mui-custom/utils';

export type SignInFormFlowItemType = 'login' | 'verify-code' | 'password';

export type SignInFormFlowContextValue = {
    moveTo(item: SignInFormFlowItemType): void;
    updateSessionId(sesstionId: string | number): void;
    sessionId?: string;
    updateVerifyCode(vCode: string): void;
    verifyCode?: string;
};

export const SignInFormFlowContext = createCtx<SignInFormFlowContextValue>();
export const useSignInFormFlow = SignInFormFlowContext.useContext;
