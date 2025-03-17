
import { UseMutationOptions, useMutation } from 'react-query';
import { CRUStudentPayload } from './types';
import { studentsApi } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';

export function useCreateNewStudent(
  options?: UseMutationOptions<ApiResponseType<CRUStudentPayload>, Error, CRUStudentPayload>,
) {
  const {
    mutate: onCreateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CRUStudentPayload>, Error, CRUStudentPayload>({
    mutationFn: (payload: CRUStudentPayload) =>
      responseWrapper(studentsApi.createStudent, [payload]),
    ...options,
  });

  return {
    onCreateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
