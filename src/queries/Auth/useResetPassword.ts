import { ApiResponseType, responseWrapper } from '@/src/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { ResetPasswordPayload, authApi } from '.';

export function useResetPassword(
  options?: UseMutationOptions<ApiResponseType<any>, Error, ResetPasswordPayload>,
) {
  const {
    mutate: onResetPassword,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, ResetPasswordPayload>({
    mutationFn: (payload: ResetPasswordPayload) =>
      responseWrapper(authApi.resetPassword, [payload]),
    ...options,
  });

  return {
    onResetPassword,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
