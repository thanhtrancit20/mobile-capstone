import React from 'react';
import ClassSessionList from './SessionList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@/src/navigator';

type Props = {
    courseId: number;
    navigation: NativeStackNavigationProp<StackParamList>;
};

export default function Attendance({ courseId, navigation }: Props) {
    const handleAttendance = (sessionId: number) => {
        navigation.navigate('FaceLogin', { classSession: sessionId });
    };

    return <ClassSessionList courseId={courseId} onAttendanceClick={handleAttendance} />;
}