import React, { useEffect, useState } from 'react'
import { Heading } from "@/components/ui/heading"
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { View } from "react-native";
import { ChevronLeftIcon, EyeIcon, EyeOffIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackProps } from "@/src/navigator";
import { Pressable } from "@/components/ui/pressable";
import { useRoute } from "@react-navigation/native";
import { Controller, useForm } from 'react-hook-form';
import { ResetPasswordPayload } from '@/src/queries';
import { useResetPassword } from '@/src/queries/Auth/useResetPassword';
import { toast } from '@backpackapp-io/react-native-toast';


const ResetPassword = ({ navigation }: StackProps) => {
    const route = useRoute<any>();
    const { token } = route.params || {};
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { error, isError, onResetPassword, isLoading, isSuccess } = useResetPassword({
        onSuccess: () => {
            toast.success('Password changed successfully!');
            navigation.replace("LoginStackNavigator");
        }
    });

    const { control, getValues, setValue, handleSubmit, watch } = useForm<ResetPasswordPayload>({
        defaultValues: {
            token: '',
            newPassword: '',
            confirmPassword: ''
        },
        mode: 'onChange',
        shouldFocusError: true,
        reValidateMode: 'onChange',
    });

    const onSubmit = (data: ResetPasswordPayload) => {
        console.log(data);
        onResetPassword(data);
    };
    const newPassword = watch("newPassword");

    useEffect(() => {
        setValue('token', token);
    }, [token])
    return (
        <SafeAreaView className="flex-1 bg-[#f7f7fb]">
            <View className='flex flex-1 my-40 px-8' >
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon
                        as={ChevronLeftIcon}
                        className="text-typography-500 w-8 h-8 bg-gray-200 border rounded-full p-5 mb-5"
                    />
                </Pressable>
                <Heading className='text-black mb-5' size='xl'>Set a new password</Heading>
                <Text className="text-black text-xl">Create a new password. Ensure it differs from previous ones for security.</Text>

                <VStack space="md" className="my-4">
                    <Text className="text-black font-semibold text-xl">Password</Text>
                    <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input variant="outline" size="xl" isInvalid={false} className="w-full">
                                    <InputField
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="Enter your new password"
                                        type={showNewPassword ? 'text' : 'password'} />
                                    <InputSlot className="pr-3" onPress={() => setShowNewPassword(!showNewPassword)}>
                                        <InputIcon as={showNewPassword ? EyeIcon : EyeOffIcon} />
                                    </InputSlot>
                                </Input>
                                {error && <Text className="text-red-500">{error.message}</Text>}
                            </>
                        )} />
                </VStack>

                <VStack space="md" className="my-4">
                    <Text className="text-black font-semibold text-xl">Confirm Password</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: "Confirm password is required",
                            validate: (value) => value === newPassword || "Passwords do not match",
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <Input variant="outline" size="xl" isInvalid={false} className="w-full">
                                    <InputField
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="Re-enter password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                    />
                                    <InputSlot className="pr-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                                    </InputSlot>
                                </Input>
                                {error && <Text className="text-red-500">{error.message}</Text>}
                            </>
                        )} />
                </VStack>

                <Button onPress={handleSubmit(onSubmit)} size="xl" variant="solid" className='bg-blue-500 my-5 w-full'>
                    <ButtonText>Reset Password</ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword