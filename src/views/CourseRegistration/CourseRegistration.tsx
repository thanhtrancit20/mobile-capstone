import { View } from 'react-native';
import React from 'react';
import { StackProps } from '@/src/navigator';
import UnregisteredCourses from '@/src/components/UnregisteredCourses';
import { useGetCurrentOpenSemester } from '@/src/queries/Semester/useGetCurrentOpenSemester';
import { useGetCurrentStudentInfo } from '@/src/queries/Students/useGetCurrentStudentInfo';
import { Heading } from '@/components/ui/heading';
import RegisteredCourses from '@/src/components/RegisteredCourses';

export default function CourseRegistration({ navigation }: StackProps) {
    const { semester, isFetching: isSemesterFetching } = useGetCurrentOpenSemester();
    const { student, isFetching: isStudentFetching } = useGetCurrentStudentInfo();

    if (isSemesterFetching) {
        return (
            <View className="flex items-center justify-center bg-[#f7f7fb] h-screen">
                <Heading className="text-l">Loading...</Heading>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#f7f7fb]">
            <UnregisteredCourses semester={semester} student={student} />
            <RegisteredCourses semester={semester} student={student} />
        </View>
    );
}
