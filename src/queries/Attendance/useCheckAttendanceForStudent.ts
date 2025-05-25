import { UseMutationOptions, useMutation } from 'react-query';
import { attendanceApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { StudentCheckAttendancePayload } from './types';

export default function useCheckAttendanceForStudent(
  options?: UseMutationOptions<ApiResponseType<void>, Error, StudentCheckAttendancePayload>,
) {
  const {
    mutate: onCheckAttendance,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, StudentCheckAttendancePayload>({
    mutationFn: (payload: StudentCheckAttendancePayload) =>
      responseWrapper(attendanceApis.studentCheckAttendance, [payload]),
    ...options,
  });

  return { onCheckAttendance, isLoading, isSuccess, isError, error };
}