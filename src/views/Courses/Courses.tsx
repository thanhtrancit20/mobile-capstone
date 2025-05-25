import { StackProps } from "@/src/navigator";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { useGetApprovedCoursesForStudentByStudentId } from "@/src/queries/Registration/useGetApprovedCoursesForStudentByStudentId";
import { useAuthStore } from "@/src/zustand/auth/useAuthStore";
import { useGetCurrentOpenSemester } from "@/src/queries/Semester/useGetCurrentOpenSemester";
import { useEffect, useState } from "react";
import { replaceLocalhost } from "@/src/utils/replaceLocalhost";

export default function Courses({ navigation }: StackProps) {
    const noImage = require('@/src/assets/images/no_img.png');
    const { user } = useAuthStore();
    const { semester } = useGetCurrentOpenSemester();
    const [refreshing, setRefreshing] = useState(false);
    const { approvedCourses, isFetching, error, setTableParams, onGetApprovedCoursesForStudentByStudentId } =
        useGetApprovedCoursesForStudentByStudentId({ id: (user.id).toString() });
    useEffect(() => {
        if (semester?.id) {
            setTableParams((prevParams) => ({
                ...prevParams,
                semesterId: semester.id,
            }));
        }
    }, [semester, setTableParams]);
    const onRefresh = async () => {
        setRefreshing(true);
        await onGetApprovedCoursesForStudentByStudentId();
        setRefreshing(false);
    };

    if (isFetching) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text className="mt-2 text-gray-600">Đang tải danh sách môn học...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center px-4">
                <Text className="text-red-500 text-center">Lỗi tải dữ liệu: {error.message}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#f7f7fb] px-4 py-4">
            <FlatList
                data={approvedCourses}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CourseDetailTabs', { courseId: item.courseDetails.id });
                        }}
                        className="bg-white p-3 rounded-2xl shadow mb-4 flex-row items-center space-x-4"
                    >
                        <Image
                            source={{ uri: replaceLocalhost(item.thumbnail) }}
                            className="w-32 h-20 rounded-xl mr-3"
                            resizeMode="cover"
                        />
                        <View className="flex-1">
                            <Text className="text-lg font-semibold">{item.courseCode}</Text>
                            <Text className="text-sm text-gray-600">{item.courseName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
