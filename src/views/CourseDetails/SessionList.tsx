import { SessionResponse } from "@/src/queries/Attendance/types";
import useGetAllClassSessionsByCourseId from "@/src/queries/Attendance/useGetAllClassSessionsByCourseId";
import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

type Props = {
    courseId: number;
    onAttendanceClick: (sessionId: number) => void;
};

export default function ClassSessionList({ courseId, onAttendanceClick }: Props) {
    const {
        data: allSessionsResponse,
        error,
        isFetching,
    } = useGetAllClassSessionsByCourseId({
        courseId,
        enabled: !!courseId,
    });

    if (isFetching) return <Text>Loading sessions...</Text>;
    if (error) return <Text>Error loading sessions: {error.message}</Text>;

    const sessions: SessionResponse[] = allSessionsResponse?.result || [];

    const renderItem = ({ item }: { item: SessionResponse }) => {
        const sessionDate = new Date(item.sessionDate).toLocaleDateString();
        const startTime = item.timeSlot?.startTime || "";
        const endTime = item.timeSlot?.endTime || "";

        return (
            <View style={styles.sessionItem}>
                <Text style={styles.sessionText}>Date: {sessionDate}</Text>
                <Text style={styles.sessionText}>
                    Time: {startTime} - {endTime}
                </Text>
                <Button title="Take Attendance" onPress={() => onAttendanceClick(item.id)} />
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
});
