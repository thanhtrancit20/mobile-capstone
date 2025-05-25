import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "../helpers";
import { SessionResponse } from "./types";
import { API_ATTENDANCE_QUERIES } from "./keys";
import { attendanceApis } from ".";
import { isEmpty } from "@/src/utils";

export default function useGetAllClassSessionsByCourseId(
  options: UseQueryOptions<ApiResponseType<SessionResponse[]>, Error> & {
    courseId: number;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAllClassSessionsByCourseId,
  } = useQuery<ApiResponseType<SessionResponse[]>, Error>(
    [API_ATTENDANCE_QUERIES.CLASS_SESSION_BY_COURSE_ID, options.courseId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper(attendanceApis.getAllClassSessions, params);
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options.courseId), // Re-enable the condition for enabling the query
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateClassSession = () => {
    queryClient.invalidateQueries([
      API_ATTENDANCE_QUERIES.CLASS_SESSION_BY_COURSE_ID,
      { courseId: options.courseId },
    ]);
  };

  return {
    data,
    error,
    isFetching,
    onGetAllClassSessionsByCourseId,
    handleInvalidateClassSession,
  };
}
