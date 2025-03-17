import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { StackProps } from '@/src/navigator';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { View } from 'react-native';
import { ChangePasswordPayload } from '@/src/queries';
import { useChangePassword } from '@/src/queries/Auth';
import { Button, ButtonText } from '@/components/ui/button';

const ChangePasword = ({ navigation }: StackProps) => {
  const { onChangePassword } = useChangePassword({
    onSuccess: data => {
      alert('Password changed successfully');
      navigation.replace('LoginStackNavigator');
    },
  });

  const { control, handleSubmit } = useForm<ChangePasswordPayload>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: ChangePasswordPayload) => {
    onChangePassword(data);
  };

  return (
    <SafeAreaView>
      <View className="flex items-center bg-[#f7f7fb]">
        <VStack space="md" className="px-8">
          <Text className="text-black font-semibold text-xl">Old Password</Text>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="xl" isDisabled={false} className="w-full">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  type={'text'}
                  placeholder="Enter your old password"
                />
              </Input>
            )}
          />
        </VStack>

        <VStack space="md" className="px-8">
          <Text className="text-black font-semibold text-xl">New Password</Text>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="xl" isDisabled={false} className="w-full">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  type={'text'}
                  placeholder="Enter your new password"
                />
              </Input>
            )}
          />
        </VStack>
        <VStack space="md" className="px-8">
          <Text className="text-black font-semibold text-xl">Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="xl" isDisabled={false} className="w-full">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  type={'text'}
                  placeholder="Enter your confirm password"
                />
              </Input>
            )}
          />
        </VStack>
        <Button
          size="xl"
          variant="solid"
          className="bg-blue-500 w-2/4 my-5"
          onPress={handleSubmit(onSubmit)}>
          <ButtonText>Change</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasword;
