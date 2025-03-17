import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { registrationApis } from '.';
import { isEmpty } from '@/src/utils';
import {
  ApiResponseType,
  GetPropertiesParams,
  PaginationResponseType,
  responseWrapper,
} from '../helpers';
import { CourseResponse } from '../Semester';
import { REGISTER_COURSE_API_KEY } from './keys';

export function useGetUnregisteredCourseForStudent(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    defaultParams?: GetPropertiesParams;
  },
) {
  const [params, setParams] = useState<GetPropertiesParams>(options?.defaultParams || {});

  const queryClient = useQueryClient();

  const handleInvalidateUnregisteredCourses = () =>
    queryClient.invalidateQueries([REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES, params])

  const {
    data,
    error,
    isFetching,
    refetch: onGetUnregisteredCourseForStudent,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES, params],
    async ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        registrationApis.getAllUnregisteredCoursesInSemesterByDepartmentForStudent,
        [queryParams],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params?.studentId) && !isEmpty(params?.semesterId) && !isEmpty(params?.departmentId),
      ...options,
    },
  );

  useEffect(() => {
    if (params.studentId && params.semesterId && params.departmentId) {
      queryClient.invalidateQueries([REGISTER_COURSE_API_KEY.GET_UNREGISTERED_COURSES, params]);
    }
  }, [params, queryClient]);

  // Ensure result is always an object
  const result = data?.result ?? {} as PaginationResponseType<CourseResponse[]>;

  return {
    current: result.current ?? 0,
    totalElements: result.totalElements ?? 0,
    pageSize: result.pageSize ?? 0,
    totalPages: result.totalPages ?? 0,
    unregisteredCourses: result.data ?? [],
    error,
    isFetching,
    setParams,
    onGetUnregisteredCourseForStudent,
    handleInvalidateUnregisteredCourses
  };
}

