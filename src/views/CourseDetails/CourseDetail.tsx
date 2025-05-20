import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const tabs = ["Course", "Lessons", "Attendance"];

const courseDetail = {
    courseName: "Lập trình Web",
    courseCode: "WEB101",
    description: "Giới thiệu HTML, CSS, JS và React.",
    lessons: [
        { title: "Buổi 1: HTML cơ bản" },
        { title: "Buổi 2: CSS Flexbox" },
        { title: "Buổi 3: JavaScript cơ bản" },
    ],
};

export default function CourseDetailManualTabs() {
    const [activeTab, setActiveTab] = useState("Course");

    const renderTabContent = () => {
        switch (activeTab) {
            case "Course":
                return (
                    <View className="p-4">
                        <Text className="text-xl font-bold">{courseDetail.courseName}</Text>
                        <Text className="text-sm text-gray-500 mb-2">Mã môn: {courseDetail.courseCode}</Text>
                        <Text className="text-gray-700">{courseDetail.description}</Text>
                    </View>
                );
            case "Lessons":
                return (
                    <ScrollView className="p-4">
                        {courseDetail.lessons.map((lesson, index) => (
                            <Text key={index} className="mb-2">• {lesson.title}</Text>
                        ))}
                    </ScrollView>
                );
            case "Attendance":
                return (
                    <View className="p-4">
                        <Text>Thông tin điểm danh sẽ hiển thị ở đây.</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Tabs */}
            <View className="flex-row border-b border-gray-200">
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        className={`flex-1 p-3 items-center ${activeTab === tab ? "border-b-2 border-indigo-500" : ""}`}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text className={`${activeTab === tab ? "text-indigo-600 font-semibold" : "text-gray-600"}`}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            <View className="flex-1">
                {renderTabContent()}
            </View>
        </View>
    );
}