import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { User } from '@/src/zustand/auth/types';
import { API_QUERIES } from '../keys';
import { authApi } from '.';

export function useGetFaceVerified(
  options?: UseQueryOptions<ApiResponseType<User>, Error, User> & {
    enabled?: boolean;
  },
) {
  const {
    data: faceVerified,
    error,
    isError,
    isFetching,
    isSuccess,
    refetch: onGetFaceVerified,
  } = useQuery<ApiResponseType<User>, Error, User>([API_QUERIES.FACE_VERIFIED], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<User>>(authApi.getFaceVerified);
    },
    select: data => data?.result,
    notifyOnChangeProps: ['data', 'isFetching'],
    enabled: options?.enabled,
    staleTime: 0,
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateFaceVerified = () => queryClient.invalidateQueries(API_QUERIES.FACE_VERIFIED);

  return {
    faceVerified,
    error,
    isError,
    isFetching,
    isSuccess,
    onGetFaceVerified,
    handleInvalidateFaceVerified,
  };
}
