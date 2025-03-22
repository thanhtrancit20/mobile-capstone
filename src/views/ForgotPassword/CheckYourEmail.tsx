import React, { useEffect, useState } from "react"

import { Heading } from "@/components/ui/heading"
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackProps } from "@/src/navigator";
import { Pressable } from "@/components/ui/pressable";
import { useRoute } from "@react-navigation/native";
import { ForgotPasswordPayload, useForgotPassword } from "@/src/queries";
import { Controller, useForm } from "react-hook-form";
import { HStack } from "@/components/ui/hstack";
import { ActivityIndicator } from "react-native-paper";


export default function CheckYourEmail({ navigation }: StackProps) {
    const route = useRoute<any>();
    const { username } = route.params || {};
    const { onForgotPassword, isLoading } = useForgotPassword({
        onSuccess: () => {
        }
    });
    const handleResendEmailBro = () => {
        onForgotPassword({ username })
    }
    return (
        <SafeAreaView className="flex-1 bg-[#f7f7fb]">
            <View className='flex flex-1 my-20 px-8' >
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon
                        as={ChevronLeftIcon}
                        className="text-typography-500 w-8 h-8 bg-gray-200 border rounded-full p-5 mb-5"
                    />
                </Pressable>
                <Heading className='text-black mb-5' size='xl'>Check your email</Heading>
                <Text className="text-black text-xl">We sent a reset link to your email, please check to set a new password</Text>
                <HStack className="text-center mt-2">
                    <Text className="text-gray-500 text-xl mr-2">Haven't got the email yet?</Text>
                    <TouchableOpacity onPress={handleResendEmailBro}>
                        {isLoading ? <ActivityIndicator color="#3b82f6" /> : <Text className="color-blue-500 underline text-xl">Resend email</Text>}
                    </TouchableOpacity>
                </HStack>
            </View>
        </SafeAreaView>
    );
}
