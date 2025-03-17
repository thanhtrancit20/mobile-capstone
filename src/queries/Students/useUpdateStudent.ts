import { UseMutationOptions, useMutation } from 'react-query';
import { CRUStudentPayload } from './types';
import { studentsApi } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';

export function useUpdateStudent(
  options?: UseMutationOptions<
    ApiResponseType<CRUStudentPayload>,
    Error,
    { id: number; data: CRUStudentPayload }
  >,
) {
  const {
    mutate: onUpdateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<
    ApiResponseType<CRUStudentPayload>,
    Error,
    { id: number; data: CRUStudentPayload }
  >({
    mutationFn: ({ id, data }) => responseWrapper(studentsApi.updateStudent, [id, data]),
    ...options,
  });

  return {
    onUpdateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
