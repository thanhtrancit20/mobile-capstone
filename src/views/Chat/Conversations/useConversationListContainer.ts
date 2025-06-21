import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@/src/navigator/stack";
import { useRoute, RouteProp, useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import { useAuthStore } from "@/src/zustand/auth/useAuthStore";
import { useGetConversationList } from "@/src/queries/Chat/useGetConversationList";
import { useChatWebSocket } from "@/src/hooks/useChatWebSocket";
import { ONLINE_STATUS } from "@/src/zustand/auth/types";
import { ConversationResponse } from "@/src/queries/Chat/types";

export const useConversationListContainer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const route = useRoute<RouteProp<StackParamList, "ChatRoom">>();
  const { recipientId: currentRecipientId = "" } = route.params || {};
  const { user, accessTokenState } = useAuthStore();
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);

  const {
    conversations: chatConversations,
    onGetConversationsList,
  } = useGetConversationList();

  useFocusEffect(
    useCallback(() => {
      onGetConversationsList();
    }, [onGetConversationsList])
  );

  useChatWebSocket({
    userId: user?.id?.toString(),
    token: String(accessTokenState),
    serverUrl: "http://192.168.2.4:8086/chat-svc/ws",
    subscriptionChannels: [`/user/${user?.id}/queue/messages`, "/user/public"],
    onMessage: (message) => {
      if (message.source === "/user/public") {
        setConversations((currentConversations) => {
          const filteredConversations = (currentConversations || []).filter(
            (conversation) => String(conversation.userId) !== String(message.data.userId)
          );
          return [...filteredConversations, message.data];
        });
      }
    },
  });

  useEffect(() => {
    if (chatConversations) {
      setConversations(chatConversations);
    }
  }, [chatConversations]);

  const checkIsOnline = (status: ONLINE_STATUS) => {
    return status === ONLINE_STATUS.ONLINE ? "available" : "invisible";
  };

  const handleChangeActiveConversation = (recipientId: string) => {
    navigation.navigate("ChatRoom", { recipientId });
  };

  const isActive = (recipientId: string) => recipientId === currentRecipientId;

  return {
    states: {
      conversations,
      user,
    },
    handlers: { handleChangeActiveConversation, isActive, checkIsOnline },
  };
};
