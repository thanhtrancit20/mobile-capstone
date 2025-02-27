import { ApiResponseType, responseWrapper } from '@/src/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { ChangePasswordPayload, authApi } from '.';

export function useChangePassword(
  options?: UseMutationOptions<ApiResponseType<any>, Error, ChangePasswordPayload>,
) {
  const {
    mutate: onChangePassword,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, ChangePasswordPayload>({
    mutationFn: (payload: ChangePasswordPayload) =>
      responseWrapper(authApi.changePassword, [payload]),
    ...options,
  });

  return {
    onChangePassword,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
