import { toast } from '@backpackapp-io/react-native-toast';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '@/src/zustand/auth/useAuthStore';
import { useUpdateFaceVerified } from '@/src/queries/Auth/useUpdateFaceVerified';
import { StackProps } from '@/src/navigator';

export default function FaceRegister({ navigation }: StackProps) {
    const { user } = useAuthStore();
    const studentId = user.studentId;
    const username = user.username;
    console.log(studentId)
    const [permission, requestPermission] = useCameraPermissions();
    const [isUploading, setIsUploading] = useState(false);
    const cameraRef = useRef<CameraView | null>(null);

    const { onUpdateFaceVerified, isLoading, isSuccess, isError, error } = useUpdateFaceVerified();
    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const takePictureAndUpload = async () => {
        if (!studentId.trim()) {
            Alert.alert('Missing Info', 'Please enter Student ID');
            return;
        }

        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: false });
                setIsUploading(true);
                await uploadImage(photo.uri);
            } catch (error) {
                Alert.alert('Error', 'Could not capture or upload image');
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
            const serverUrl = 'http://10.0.2.2:5000/register-face';
            const result = await axios.post(serverUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onUpdateFaceVerified({ username });
            toast.success('Face Verified successfully!');
            navigation.goBack();
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Unknown error';
            Alert.alert('Registration Failed', errorMessage);
            console.error('Error registering face:', error);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="front"
                ref={cameraRef}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, isUploading && styles.buttonDisabled]}
                        onPress={takePictureAndUpload}
                        disabled={isUploading}
                    >
                        <Text style={[styles.text, isUploading && styles.textDisabled]}>
                            {isUploading ? 'Uploading...' : 'Register Face'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    input: {
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    camera: { flex: 1 },
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
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});
