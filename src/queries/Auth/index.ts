import useApi from './api';

export * from './types';
export * from './useChangePassword';
export * from './useForgotPassword';
// eslint-disable-next-line react-hooks/rules-of-hooks
export const authApi = useApi();
