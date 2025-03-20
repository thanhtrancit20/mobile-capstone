import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { StackProps } from '@/src/navigator/stack';
import { useConversationListContainer } from './useConversationListContainer';
import ChatItem from '@/src/components/ChatItem/ChatItem';
import { formatTime } from '@/src/utils';

export default function Chat({ navigation }: StackProps) {
  const {
    states: { conversations, user },
    handlers: { handleChangeActiveConversation, isActive, checkIsOnline },
  } = useConversationListContainer();

  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fb]">
      <View className="w-full h-full">
        <FlatList
          data={conversations}
          keyExtractor={(item) => `${item.id}-${item.userId}`}
          extraData={conversations}
          renderItem={({ item }) => (
            <ChatItem
              avatarUrl={item.avatar}
              name={item.fullName}
              lastMessage={item.lastMessage?.content || "No messages yet"}
              time={formatTime(item.lastMessage?.timestamp)}
              onPress={() => handleChangeActiveConversation(item.userId)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

