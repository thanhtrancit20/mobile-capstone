import React from 'react'
import { useGetLessonsByCourseId } from '@/src/queries/Lessons'
import { FlatList, Alert, Linking, Pressable } from 'react-native'
import { Box } from '@/components/ui/box'
import { MaterialIcons } from '@expo/vector-icons'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { Divider } from '@rneui/base'

type Prop = {
    courseId: string
}

const Lessons = ({ courseId }: Prop) => {
    const handleOpenFile = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                await Linking.openURL(url)
            } else {
                Alert.alert('Không thể mở file', 'Đường dẫn không hợp lệ hoặc không được hỗ trợ')
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể mở file')
        }
    }

    const { lessons } = useGetLessonsByCourseId({ courseId })

    return (
        <FlatList
            data={lessons}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <Box className="h-4" />}
            renderItem={({ item }) => (
                <Box className="bg-white rounded-xl p-4 shadow-sm border border-gray-300">
                    <VStack className="space-y-2">
                        <HStack className="justify-between items-center">
                            <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
                        </HStack>

                        <Text className="text-base text-gray-700">{item.description}</Text>

                        {item.files.length > 0 && (
                            <VStack className="space-y-1 mt-3">
                                <Divider />
                                <Text className="italic text-base text-gray-600 mt-1">Attached documents:</Text>
                                {item.files.map((file, idx) => (
                                    <Pressable key={idx} onPress={() => handleOpenFile(`http://10.0.2.2:8085${file.filePath}`)}>
                                        <HStack className="items-center space-x-1">
                                            <Icon as={MaterialIcons} size="sm" color="$blue600" />
                                            <Text className="underline text-base text-blue-700">
                                                {file.fileName || 'Tên file không rõ'}
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                ))}
                            </VStack>
                        )}
                    </VStack>
                </Box>
            )}
        />
    )
}

export default Lessons
