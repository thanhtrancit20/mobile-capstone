import React from "react";
import { View, Text, FlatList, SafeAreaView, Image, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { useMessageListContainer } from "./useMessageListContainer";
import { useGetChatUserInfo } from "@/src/queries/Chat/useGetChatUserInfo";
import dayjs from "dayjs";
import { FontAwesome } from '@expo/vector-icons';

export const ChatRoom = () => {
    const {
        states: { chatMessagesState, user, recipientId, message },
        handlers: { handleSendMessage, setMessage },
    } = useMessageListContainer();

    const { chatUserInfo, isFetching } = useGetChatUserInfo({ userId: recipientId });
    return (
        <SafeAreaView className="flex-1 bg-white p-2">
            {isFetching ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <FlatList
                    data={chatMessagesState}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        const isOutgoing = String(item.senderId) === String(user?.id);

                        const senderName = isOutgoing ? `${user?.firstName} ${user?.lastName}` : chatUserInfo?.fullName || "Unknown";
                        const senderAvatar = isOutgoing ? user?.avatar : chatUserInfo?.avatar || "https://i.pravatar.cc/40";

                        const previousMessage = chatMessagesState[index - 1];
                        const showSenderName = !previousMessage || previousMessage.senderId !== item.senderId;

                        return (
                            <View className={`flex-row items-end my-1 ${isOutgoing ? "justify-end" : "justify-start"}`}>
                                {!isOutgoing && (
                                    <Image
                                        source={{ uri: senderAvatar }}
                                        className="w-8 h-8 rounded-full mr-2"
                                        style={{ opacity: showSenderName ? 1 : 0 }}
                                    />
                                )}
                                <View className={`max-w-[75%] px-4 py-2 rounded-xl shadow-md ${isOutgoing ? "bg-blue-500 self-end" : "bg-gray-300 self-start"}`}>
                                    {showSenderName && (
                                        <Text className={`text-md font-bold ${isOutgoing ? "text-white" : "text-black"}`}>
                                            {senderName}
                                        </Text>
                                    )}
                                    <Text className={`text-md ${isOutgoing ? "text-white self-end" : "text-black"}`}>
                                        {item.content}
                                    </Text>
                                    <Text className={`text-sm ${isOutgoing ? "text-white" : "text-gray-600"} font-medium self-end mt-0.5`}>
                                        {dayjs(item.timestamp).format("HH:mm")}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                />

            )}
            <View className="flex-row items-center border-t border-gray-300 p-2 bg-white">
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-400 rounded-lg"
                />
                <TouchableOpacity
                    onPress={handleSendMessage}
                    disabled={!message.trim()}
                    className={`ml-2 pl-2 pr-3 py-2 rounded-full ${message.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                >
                    <FontAwesome name="send" size={19} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default ChatRoom;
