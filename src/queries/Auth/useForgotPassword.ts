import { ApiResponseType, responseWrapper } from '@/src/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { ChangePasswordPayload, ForgotPasswordPayload, authApi } from '.';

export function useForgotPassword(
  options?: UseMutationOptions<ApiResponseType<any>, Error, ForgotPasswordPayload>,
) {
  const {
    mutate: onForgotPassword,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, ForgotPasswordPayload>({
    mutationFn: (payload: ForgotPasswordPayload) =>
      responseWrapper(authApi.forgotPassword, [payload]),
    ...options,
  });

  return {
    onForgotPassword,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
