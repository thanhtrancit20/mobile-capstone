import { useHttpPrivateRequest } from "@/src/services/httpRequest/useHttpPrivateRequest";
import useHttpPublicRequest from "@/src/services/httpRequest/useHttpPublicRequest ";
import { API_URLS } from "../keys";


const useApi = (baseURL = API_URLS.CHAT) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const getConversationsList = () => {
    return privateApi.get(`/api/v1/chat/conversations `);
  };

  const getChatMessagesBySenderIdAndRecipientId = (senderId: string, recipientId: string) => {
    return privateApi.get(`/messages/${senderId}/${recipientId}`);
  };

  const getChatUserInformation = (userId: string) => {
    return privateApi.get(`/api/v1/chat/users/${userId}`);
  };

  return { getConversationsList, getChatMessagesBySenderIdAndRecipientId, getChatUserInformation };
};

export default useApi;
