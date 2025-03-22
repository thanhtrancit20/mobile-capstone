import { useHttpPrivateRequest } from '@/src/services/httpRequest/useHttpPrivateRequest';
import { ChangePasswordPayload, ForgotPasswordPayload, LoginPayload, ResetPasswordPayload } from './types';
import { API_URLS } from '../keys';
import useHttpPublicRequest from '@/src/services/httpRequest/useHttpPublicRequest ';

const useApi = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (payload: LoginPayload) => {
    return publicApi.post('/api/v1/auth/token', payload);
  };

  const getUserInfo = () => {
    return privateApi.get('/api/v1/users/me');
  };

  const getRefreshToken = () => {
    return publicApi.post('/api/v1/auth/refresh');
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return privateApi.put('/api/v1/auth/change-password', body);
  };
  const forgotPassword = (body: ForgotPasswordPayload) => {
    return privateApi.post('/api/v1/users/forgot-password', body);
  };

  const resetPassword = (body: ResetPasswordPayload) => {
    return privateApi.post('/api/v1/users/reset-password', body);
  };

  return {
    authenticate,
    getUserInfo,
    getRefreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
  };
};

export default useApi;
