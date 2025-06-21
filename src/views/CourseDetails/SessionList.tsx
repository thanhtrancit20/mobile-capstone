import { SessionResponse } from "@/src/queries/Attendance/types";
import useGetAllClassSessionsByCourseId from "@/src/queries/Attendance/useGetAllClassSessionsByCourseId";
import { useAuthStore } from "@/src/zustand/auth/useAuthStore";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, TouchableOpacity } from "react-native";

type Props = {
    courseId: number;
    onAttendanceClick: (sessionId: number) => void;
};

export default function ClassSessionList({ courseId, onAttendanceClick }: Props) {
    const { user } = useAuthStore();
    const currentStudentId = user.id;
    const {
        data: allSessionsResponse,
        error,
        isFetching,
        onGetAllClassSessionsByCourseId
    } = useGetAllClassSessionsByCourseId({
        courseId,
        enabled: !!courseId,
    });

    const onRefresh = () => {
        if (courseId) {
            onGetAllClassSessionsByCourseId();
        }
    };
    useFocusEffect(
        useCallback(() => {
            onRefresh();
        }, [courseId])
    )

    if (isFetching) return <Text>Loading sessions...</Text>;
    if (error) return <Text>Error loading sessions: {error.message}</Text>;

    const sessions: SessionResponse[] = allSessionsResponse?.result || [];

    const renderItem = ({ item }: { item: SessionResponse }) => {
        if (!item)
            return null;
        const sessionDateObj = new Date(item.sessionDate);
        const startTime = item.timeSlot?.startTime || "";
        const endTime = item.timeSlot?.endTime || "";

        const startDateTime = new Date(sessionDateObj);
        if (startTime) {
            const [startHour, startMinute, startSecond] = startTime.split(":").map(Number);
            startDateTime.setHours(startHour, startMinute, startSecond || 0);
        }

        const endDateTime = new Date(sessionDateObj);
        if (endTime) {
            const [endHour, endMinute, endSecond] = endTime.split(":").map(Number);
            endDateTime.setHours(endHour, endMinute, endSecond || 0);
        }

        const now = new Date();

        const localDateStr = sessionDateObj.toLocaleDateString();
        const localStartTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const localEndTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const isAlreadyAttended = item.attendances?.some(
            att => att.studentId === currentStudentId && att.status === 'PRESENT'
        );

        const isAttendanceTime = now >= startDateTime && now <= endDateTime;
        const isAttendanceAllowed = isAttendanceTime && !isAlreadyAttended;

        let buttonText = "Not Available";
        let buttonColor = "gray";

        if (isAlreadyAttended) {
            buttonText = "Already Attended";
            buttonColor = "#FFC107";
        } else if (isAttendanceAllowed) {
            buttonText = "Take Attendance";
            buttonColor = "#4CAF50";
        }

        return (
            <View style={styles.sessionItem}>
                <Text style={styles.sessionText}>Date: {localDateStr}</Text>
                <Text style={styles.sessionText}>
                    Time: {localStartTime} - {localEndTime}
                </Text>
                <TouchableOpacity
                    onPress={() => isAttendanceAllowed && onAttendanceClick(item.id)}
                    style={[
                        styles.button,
                        { backgroundColor: buttonColor },
                        !isAttendanceAllowed && styles.buttonDisabled
                    ]}
                    disabled={!isAttendanceAllowed}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Class Sessions List</Text>
            {sessions.length === 0 ? (
                <Text>No sessions available.</Text>
            ) : (
                <FlatList
                    data={sessions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                            colors={['#007AFF']} // Optional: spinner color
                        />
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, flex: 1 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
    sessionItem: {
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    sessionText: {
        fontSize: 16,
        marginBottom: 4,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
});
