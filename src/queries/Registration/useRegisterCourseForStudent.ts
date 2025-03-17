import { UseMutationOptions, useMutation } from 'react-query';
import { registrationApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { StudentRegisterCoursePayload } from '../Students/types';
import { API_STUDENTS_QUERIES } from '../Students/keys';

export function useRegisterCourseForStudent(
  options?: UseMutationOptions<ApiResponseType<void>, Error, StudentRegisterCoursePayload>,
) {
  const {
    mutate: onRegisterCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, StudentRegisterCoursePayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.registerCourse, [payload]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.REGISTER_COURSE],
    },
    ...options,
  });

  return {
    onRegisterCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
