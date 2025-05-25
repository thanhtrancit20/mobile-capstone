import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from "@/src/navigator";
import { useGetCourseDetail } from "@/src/queries/Courses/useGetCourseDetail";
import CourseInformation from "./CourseInformation";
import AssessmentPlan from "./AssessmentPlan";
import LearningMaterials from "./LearningMaterials";
import Lessons from "./Lessons";
import Attendance from "./Attendance";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const tabs = ["Course", "Lessons", "Attendance", "Assessment Plan", "Learning Materials"];

type CourseDetailTabsProps = NativeStackScreenProps<StackParamList, 'CourseDetailTabs'>;

export default function CourseDetailManualTabs({ route, navigation }: CourseDetailTabsProps) {
    const [activeTab, setActiveTab] = useState("Course");
    const { courseId } = route.params;
    const { courseDetail, error, handleInvalidateTeachersList, isFetching, onGetTeachersInCourse } = useGetCourseDetail({ courseId });

    const renderTabContent = () => {
        switch (activeTab) {
            case "Course":
                return (
                    <CourseInformation isFetching={isFetching} courseInformation={courseDetail?.courseInformation} />
                );
            case "Assessment Plan":
                return (
                    <AssessmentPlan isFetching={isFetching} assessmentPlan={courseDetail?.assessmentPlan} />
                );
            case "Learning Materials":
                return (
                    <LearningMaterials isFetching={isFetching} learningMaterials={courseDetail?.learningMaterialsAndOutcomes} />
                );
            case "Lessons":
                return (
                    <Lessons courseId={courseId} />
                );
            case "Attendance":
                return (
                    <Attendance courseId={Number(courseId)} navigation={navigation} />
                );
            default:
                return (
                    <View className="p-4">
                        <Text>Không có nội dung cho tab này.</Text>
                    </View>
                );
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Tabs */}
            <View className="border-b border-gray-200 bg-white">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 8, alignItems: 'center', height: 48 }}
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`px-4 h-full justify-center border-b-2 ${isActive ? "border-indigo-500" : "border-transparent"}`}
                            >
                                <Text className={`${isActive ? "text-indigo-600 font-semibold" : "text-gray-600"}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Tab Content */}
            <View className="flex-1">
                {renderTabContent()}
            </View>
        </View>
    );
}
