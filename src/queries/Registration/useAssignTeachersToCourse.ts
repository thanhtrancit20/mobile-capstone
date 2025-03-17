
import { UseMutationOptions, useMutation } from 'react-query';
import { registrationApis } from '.';
import { AssignTeacherPayload } from './types';
import { REGISTER_COURSE_API_KEY } from './keys';
import { ApiResponseType, responseWrapper } from '../helpers';

export function useAssignTeachersToCourse(
  options?: UseMutationOptions<ApiResponseType<void>, Error, AssignTeacherPayload>,
) {
  const {
    mutate: onAssignTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, AssignTeacherPayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.assignTeacherToCourse, [payload]),
    meta: {
      invalidates: [REGISTER_COURSE_API_KEY.ASSIGN_TEACHER],
    },
    ...options,
  });

  return {
    onAssignTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
