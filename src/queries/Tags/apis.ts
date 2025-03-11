import { useHttpPrivateRequest } from '@/src/services/httpRequest/useHttpPrivateRequest';
import { API_URLS, GetPropertiesParams } from '..';
import { stringify } from '@/src/utils';

const useTagApis = (baseURL = API_URLS.BLOG) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getTags = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/tags?${stringify(params)}`);
  };

  return {
    getTags,
  };
};

export default useTagApis;
