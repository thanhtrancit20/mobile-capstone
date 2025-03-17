import React from "react"

import { Heading } from "@/components/ui/heading"
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { View } from "react-native";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackProps } from "@/src/navigator";
import { Pressable } from "@/components/ui/pressable";


export default function ForgotPassword({ navigation }: StackProps) {

  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fb]">
      <View className='flex flex-1 my-40 px-8' >

        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            as={ChevronLeftIcon}
            className="text-typography-500 w-8 h-8 bg-gray-200 border rounded-full p-5 mb-5"
          />
        </Pressable>
        <Heading className='text-black mb-5' size='xl'>Forgot password</Heading>

        <Text className="text-black text-xl">Please enter your email to reset the password</Text>

        <VStack space="md" className="my-4">
          <Text className="text-black font-semibold text-xl">Email</Text>
          <Input variant="outline" size="xl" isInvalid={false} className="w-full">
            <InputField
              // value={value}
              // onChangeText={onChange}
              placeholder="Enter your email"
              type="text"
            />
          </Input>
          {/* <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (

          )}
        /> */}
        </VStack>

        <Button size="xl" variant="solid" className='bg-blue-500 my-5 w-full'>
          <ButtonText>Reset Password</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
