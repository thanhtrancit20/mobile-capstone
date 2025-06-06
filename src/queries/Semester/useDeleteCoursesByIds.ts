import { UseMutationOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { useMutation } from 'react-query';
import { semesterApi } from '.';

export function useDeleteCoursesByIds(
  // options here is used to pass the configuration options for the useMutation hook
  options?: UseMutationOptions<ApiResponseType<any>, Error, string[]>,
) {
  // The useMutation hook is called with the configuration options

  const {
    mutate: onDeleteCoursesByIds,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, string[]>({
    // This function will call the deleteStudent function from the studentsApi and pass the id parameter as an argument
    mutationFn: (payload: string[]) =>
      responseWrapper(semesterApi.deleteCoursesByIds, [payload]),

    // The options parameter is spread to the useMutation hook
    ...options,
  });

  return {
    onDeleteCoursesByIds,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
