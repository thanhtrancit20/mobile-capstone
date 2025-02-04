import { Auth, RefreshTokenPayload } from '@/src/queries/Auth/types';
import { ApiResponseType, responseWrapper } from '@/src/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { authApi } from '.';

export function useRefreshToken(
  options?: UseMutationOptions<ApiResponseType<Auth>, Error, RefreshTokenPayload>,
) {
  const {
    mutate: onRefreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<Auth>, Error, RefreshTokenPayload>({
    mutationFn: (payload: RefreshTokenPayload) =>
      responseWrapper(authApi.getRefreshToken, [payload]),
    ...options,
  });

  return {
    onRefreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}