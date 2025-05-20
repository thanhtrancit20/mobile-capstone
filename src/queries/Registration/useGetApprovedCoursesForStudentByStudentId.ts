import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import {
  ApiResponseType,
  GetPropertiesParams,
  PaginationResponseType,
  responseWrapper,
} from '../helpers';
import { registrationApis } from '.';
import { RegistrationResponse } from './types';
import { REGISTER_COURSE_API_KEY } from './keys';

export function useGetApprovedCoursesForStudentByStudentId(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<RegistrationResponse[]>>,
    Error
  > & { id: string; semesterId?: number }
) {
  const [tableParams, setTableParams] = useState<GetPropertiesParams>({
    current: 1,
    pageSize: 10,
    semesterId: options?.semesterId,  // Initial semesterId from options
  });

  const {
    data,
    error,
    isFetching,
    refetch: onGetApprovedCoursesForStudentByStudentId,
  } = useQuery<ApiResponseType<PaginationResponseType<RegistrationResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_APPROVED_COURSES, { id: options?.id, tableParams }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<RegistrationResponse[]>>>(
        registrationApis.getApprovedCoursesForStudentByStudentId,
        params
      );
    },
    {
      // Ensure the request is only made when semesterId and id are available
      enabled: !!options?.id && !!tableParams.semesterId,
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      ...options,
    }
  );

  const queryClient = useQueryClient();

  const handleInvalidateApprovedCourses = () =>
    queryClient.invalidateQueries([REGISTER_COURSE_API_KEY.GET_APPROVED_COURSES, tableParams]);

  const {
    result: { current, totalPages, pageSize, totalElements, data: approvedCourses = [] } = {},
  } = data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    approvedCourses,
    isFetching,
    error,
    onGetApprovedCoursesForStudentByStudentId,
    handleInvalidateApprovedCourses,
    setTableParams,
  };
}
