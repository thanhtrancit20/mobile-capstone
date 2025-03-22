import { ApiResponseType, responseWrapper } from '../helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { registrationApis } from '.';
import { RemovalRegisterCourseForStudentPayload } from '../Students/types';
import { API_STUDENTS_QUERIES } from '../Students/keys';

export function useRemoveRegistrations(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    RemovalRegisterCourseForStudentPayload
  >,
) {
  const {
    mutateAsync: onRemoveRegistrations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, RemovalRegisterCourseForStudentPayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.removeRegistrations, [payload]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.REMOVE_REGISTERED_COURSE],
    },
    ...options,
  });

  return {
    onRemoveRegistrations,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
