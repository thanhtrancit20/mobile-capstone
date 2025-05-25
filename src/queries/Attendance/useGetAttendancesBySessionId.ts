import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { AttendanceResponse } from './types';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_ATTENDANCE_QUERIES } from './keys';
import { attendanceApis } from '.';

export default function useGetAttendancesBySessionId(
  options?: UseQueryOptions<ApiResponseType<AttendanceResponse[]>, Error> & {
    classSessionId: number;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetClassSessionBySessionId,
  } = useQuery<ApiResponseType<AttendanceResponse[]>, Error>(
    [API_ATTENDANCE_QUERIES.CLASS_SESSION_BY_SESSION_ID, options?.classSessionId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<AttendanceResponse[]>>(
        attendanceApis.getAttendanceListByClassSessionId,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!options?.classSessionId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateClassSession = () =>
    queryClient.invalidateQueries([
      API_ATTENDANCE_QUERIES.CLASS_SESSION_BY_SESSION_ID,
      options?.classSessionId,
    ]);

  //const { totalPages, pageSize, totalElements, data: blogs = [] } = data?.result || {};
  const classSession = data?.result || {};

  return {
    classSession,
    error,
    isFetching,
    onGetClassSessionBySessionId,
    handleInvalidateClassSession,
  };
}
