import { useChatWebSocket } from "@/src/hooks/useChatWebSocket";
import { ChatMessageResponse } from "@/src/queries/Chat/types";
import { useGetChatMessages } from "@/src/queries/Chat/useGetChatMessages";
import { useAuthStore } from "@/src/zustand/auth/useAuthStore";
import { useEffect, useState, useCallback } from "react";
import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "@/src/navigator/stack";

export const useMessageListContainer = () => {
  const route = useRoute<RouteProp<StackParamList, "ChatRoom">>();
  const { recipientId = "" } = route.params || {};
  const { user, accessTokenState } = useAuthStore();

  const senderId = user?.id ? user.id.toString() : "";
  const [message, setMessage] = useState<string>("");
  const [chatMessagesState, setChatMessagesState] = useState<ChatMessageResponse[]>([]);

  const { chatMessages, handleInvalidateChatMessages } = useGetChatMessages({
    senderId,
    recipientId,
  });
  useEffect(() => {
    console.log("🔄 Zustand user state updated:", user);
  }, [user]);
  const { sendMessage } = useChatWebSocket({
    userId: senderId,
    token: String(accessTokenState),
    serverUrl: "http://10.0.2.2:8086/chat-svc/ws",
    subscriptionChannels: [`/user/${senderId}/queue/messages`, "/user/public"],
    onMessage: (message) => {
      console.log("📩 Received WebSocket message:", message);
      if (message.source.includes(`/user/${senderId}/queue/messages`)) {
        setChatMessagesState((prev) => [...prev, message.data]);
      }
    },
  });

  useEffect(() => {
    if (recipientId) {
      handleInvalidateChatMessages();
    }
  }, [recipientId]);

  useFocusEffect(
    useCallback(() => {
      handleInvalidateChatMessages();
    }, [recipientId])
  );

  useEffect(() => {
    if (chatMessages) {
      console.log("✅ Fetched chat messages from API:", chatMessages);
      setChatMessagesState(
        [...chatMessages].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      );
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const chatMessage: ChatMessageResponse = {
        id: Date.now().toString(),
        senderId: String(user?.id ?? ''),
        recipientId: String(recipientId),
        content: message,
        chatId: `${user?.id}_${recipientId}`,
        timestamp: new Date().toISOString(),
      };

      const sent = sendMessage('/app/chat', chatMessage);
      if (sent) {
        setMessage('');
        setChatMessagesState((prev) => {
          const updatedMessages = [...prev, chatMessage].sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          return updatedMessages;
        });
      }
    }
  };

  return {
    states: {
      message,
      chatMessagesState,
      senderId,
      recipientId,
      user,
    },
    handlers: {
      handleInvalidateChatMessages,
      setChatMessagesState,
      handleSendMessage,
      setMessage,
    },
  };
};
