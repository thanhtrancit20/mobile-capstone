import { ApiResponseType, responseWrapper } from '../helpers';
import { PaginationResponseType, TableParams } from '../helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { useState } from 'react';
import { isEmpty } from '@/src/utils';
import { BlogApis, BlogsResponse } from '.';
import { API_QUERIES } from '..';

export function useGetPostById(
  options?: UseQueryOptions<ApiResponseType<BlogsResponse>, Error>
    & { id: string },
) {

  const {
    data,
    error,
    isFetching,
    refetch: onGetAllBlogs,
  } = useQuery<ApiResponseType<BlogsResponse>, Error>(
    [API_QUERIES.POST_DETAIL, { id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<BlogsResponse>>(
        BlogApis.getPostById,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!options?.id,
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidatePostDetail = () => queryClient.invalidateQueries([API_QUERIES.POST_DETAIL]);

  const blog = data?.result;

  return {
    blog,
    error,
    isFetching,
    onGetAllBlogs,
    handleInvalidatePostDetail,
  };
}
