import { UseMutationOptions, useMutation } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { authApi } from '.';

export function useUpdateFaceVerified(
    options?: UseMutationOptions<
        ApiResponseType<void>,
        Error,
        { username: string }
    >
) {
    const {
        mutate: onUpdateFaceVerified,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation<ApiResponseType<void>, Error, { username: string }>({
        mutationFn: (payload) => responseWrapper(authApi.updateFaceVerified, [payload]),
        ...options,
    });

    return {
        onUpdateFaceVerified,
        isLoading,
        isSuccess,
        isError,
        error,
    };
}
