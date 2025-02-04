import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { User } from '@/src/zustand/auth/types';
import { API_QUERIES } from '../keys';
import { authApi } from '.';

export function useGetUserInfo(
  options?: UseQueryOptions<ApiResponseType<User>, Error, User> & {
    enabled?: boolean;
  },
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUserInfo,
  } = useQuery<ApiResponseType<User>, Error, User>([API_QUERIES.IDENTITY], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<User>>(authApi.getUserInfo);
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ['data', 'isFetching'],
    enabled: options?.enabled,
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateUserInfo = () => queryClient.invalidateQueries(API_QUERIES.IDENTITY);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateUserInfo,
  };
}