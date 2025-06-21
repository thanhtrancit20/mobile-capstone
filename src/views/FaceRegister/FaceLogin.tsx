import { toast } from '@backpackapp-io/react-native-toast';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '@/src/zustand/auth/useAuthStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '@/src/navigator';
import useCheckAttendanceForStudent from '@/src/queries/Attendance/useCheckAttendanceForStudent';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';

type FaceProps = NativeStackScreenProps<StackParamList, 'FaceLogin'>;

const universityLocation = {
    latitude: 11.0528,
    longitude: 106.6661,
};

export default function FaceLogin({ route, navigation }: FaceProps) {
    const { onCheckAttendance, isSuccess, isLoading, isError } = useCheckAttendanceForStudent({
        onSuccess: () => {
            navigation.goBack();
            toast.success("Attendance Checked!");
        }
    });

    const { classSession } = route.params;
    const [permission, requestPermission] = useCameraPermissions();
    const [isUploading, setIsUploading] = useState(false);
    const cameraRef = useRef<CameraView | null>(null);
    const { user } = useAuthStore();
    const studentId = user.studentId;
    const id = user.id;

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const takePictureAndUpload = async () => {
        if (cameraRef.current) {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'Location permission is required');
                    return;
                }

                // const location = await Location.getCurrentPositionAsync({});
                // const userLocation = {
                //     latitude: location.coords.latitude,
                //     longitude: location.coords.longitude,
                // };

                // const distance = haversine(userLocation, universityLocation);

                // if (distance > 200) {
                //     Alert.alert('Too far', 'Must be within 200m of the university');
                //     return;
                // }

                const photo = await cameraRef.current.takePictureAsync({ base64: false });
                setIsUploading(true);
                await uploadImage(photo.uri);
            } catch (error) {
                Alert.alert('Lỗi', 'Không thể chụp hoặc upload hình');
                console.error(error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const uploadImage = async (uri: string) => {
        const formData = new FormData();
        const filename = uri.split('/').pop() || 'photo.jpg';
        const type = 'image/jpeg';

        formData.append('image', {
            uri: uri,
            name: filename,
            type: type,
        } as any);

        formData.append('student_id', studentId);
        try {
            const serverUrl = 'http://192.168.2.4:5000/login-face';
            const result = await axios.post(serverUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (result.data.success) {
                onCheckAttendance({
                    studentId: id,
                    classSessionId: classSession
                })
            }
            else {
                toast.error(result.data.error);
            }
        } catch (error: any) {
            console.error('Error logging in with face:', error);
            const errorMessage = error.response?.data?.error || 'Unknown error';
            Alert.alert('Login Failed', errorMessage);
        }
    };


    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="front" // Always use the front camera
                ref={cameraRef}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, isUploading && styles.buttonDisabled]}
                        onPress={takePictureAndUpload}
                        disabled={isUploading}
                    >
                        <Text style={[styles.text, isUploading && styles.textDisabled]}>
                            {isUploading ? 'Verifying...' : 'Take Picture'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 15,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonDisabled: {
        backgroundColor: '#d3d3d3',
        borderColor: '#a9a9a9',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    textDisabled: {
        color: '#a9a9a9',
    },
});
