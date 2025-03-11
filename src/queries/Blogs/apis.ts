import { useHttpPrivateRequest } from '@/src/services/httpRequest/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import { stringify } from '@/src/utils';
import { BlogsPayload } from './types';
import { GetPropertiesParams } from '../helpers';

const useApis = (baseURL = API_URLS.BLOG) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getAllBlogs = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/posts?${stringify(params)}`);
  };

  const getPostById = ({ id }: { id: string }) => {
    return privateApi.get(`/api/v1/posts/${id}`);
  };

  const createBlogs = (payload: BlogsPayload) => {
    return privateApi.post('/api/v1/posts/create-post', payload);
  };

  return {
    getAllBlogs,
    createBlogs,
    getPostById
  };
};

export default useApis;
