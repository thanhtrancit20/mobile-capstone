import { useHttpPrivateRequest } from '@/src/services/httpRequest/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import useHttpPublicRequest from '@/src/services/httpRequest/useHttpPublicRequest ';
import { CrudTeacherPayload } from './types';

const useApi = (baseURL = API_URLS.PROFILE) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const updateTeacher = (id: string, payload: CrudTeacherPayload) => {
    return privateApi.put(`/api/v1/users/teacher/${id}`, payload);
  };

  return { updateTeacher };
};

export default useApi;
