import { UseMutationOptions, useMutation } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { CrudTeacherPayload } from './types';
import { ProfileApis } from '.';

export function useUpdateTeacher(
  options?: UseMutationOptions<
    ApiResponseType<CrudTeacherPayload>,
    Error,
    { id: number; data: CrudTeacherPayload }
  >,
) {
  const {
    mutate: onUpdateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<
    ApiResponseType<CrudTeacherPayload>,
    Error,
    { id: number; data: CrudTeacherPayload }
  >({
    mutationFn: ({ id, data }) => responseWrapper(ProfileApis.updateTeacher, [id, data]),
    ...options,
  });

  return {
    onUpdateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
