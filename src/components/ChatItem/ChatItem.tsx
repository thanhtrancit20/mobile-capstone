import { TouchableOpacity, Image, View, Text } from "react-native";

interface ChatItemProps {
    avatarUrl: string;
    name: string;
    lastMessage: string;
    time: string;
    onPress: () => void;
}

export default function ChatItem({ avatarUrl, name, lastMessage, time, onPress }: ChatItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 border-b border-b-neutral-200"
        >
            <Image
                source={{ uri: avatarUrl }}
                style={{ aspectRatio: 1, height: 50 }}
                className="rounded-full"
            />
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text className="font-semibold text-neutral-800">{name}</Text>
                    <Text className="font-medium text-neutral-500">{time}</Text>
                </View>
                <Text className="font-medium text-neutral-500">{lastMessage}</Text>
            </View>
        </TouchableOpacity>
    );
}
