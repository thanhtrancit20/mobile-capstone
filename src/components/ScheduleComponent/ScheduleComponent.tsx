import { View, Text, Image, TouchableOpacity } from 'react-native';

const scheduleData = [
    { id: '1', timeStart: '14:00', timeEnd: '15:00', subject: 'Đường lối cơ bản chủ nghĩa Đường lối cơ bản chủ nghĩa Đường lối cơ bản chủ nghĩa', room: 'A101' },
    { id: '2', timeStart: '16:00', timeEnd: '17:30', subject: 'Lập trình Mobile', room: 'B202' },
];

export const ScheduleComponent = () => {
    // Xử lý logic lấy môn học sắp tới nhất
    const nextClass = scheduleData[0];

    return (
        <TouchableOpacity className="bg-white w-full rounded-2xl p-4 flex-row items-center shadow-md">
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9926/9926396.png' }}
                className="w-12 h-12 mr-3"
                resizeMode="contain"
            />

            <View className="flex-1">
                <Text className="text-black">Today's class/exam schedule:</Text>
                <Text className="text-blue-500 font-semibold">{nextClass.timeStart} - {nextClass.timeEnd}</Text>
                <Text className="text-black font-medium" numberOfLines={1}>{nextClass.subject}</Text>
            </View>

            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' }}
                className="w-5 h-5 ml-2"
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};
