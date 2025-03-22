import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { StackProps } from '@/src/navigator';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { View, SafeAreaView } from 'react-native';
import { ChangePasswordPayload } from '@/src/queries';
import { useChangePassword } from '@/src/queries/Auth';
import { Button, ButtonText } from '@/components/ui/button';
import { toast } from '@backpackapp-io/react-native-toast';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';

const ChangePassword = ({ navigation }: StackProps) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { onChangePassword } = useChangePassword({
    onSuccess: () => {
      toast.success('Password changed successfully!');
      navigation.replace('LoginStackNavigator');
    },
    onError: () => {
      toast.error('Error, Please check again!');
    }
  });

  const { control, handleSubmit, watch } = useForm<ChangePasswordPayload>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const newPassword = watch("newPassword");

  const onSubmit = (data: ChangePasswordPayload) => {
    onChangePassword(data);
  };

  return (
    <SafeAreaView className='flex-1 bg-[#f7f7fb] mt-4'>
      <View className="flex items-center bg-[#f7f7fb]">
        <VStack space="md" className="px-8 mb-5">
          <Text className="text-black font-semibold text-xl">Old Password</Text>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="xl" className="w-full">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Enter your old password"
                />
                <InputSlot className="pr-3" onPress={() => setShowOldPassword(!showOldPassword)}>
                  <InputIcon as={showOldPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
        </VStack>

        <VStack space="md" className="px-8 mb-5">
          <Text className="text-black font-semibold text-xl">New Password</Text>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Input variant="outline" size="xl" className="w-full">
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                  />
                  <InputSlot className="pr-3" onPress={() => setShowNewPassword(!showNewPassword)}>
                    <InputIcon as={showNewPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
                {error && <Text className="text-red-500">{error.message}</Text>}
              </>
            )}
          />
        </VStack>

        <VStack space="md" className="px-8 mb-5">
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
                <Input variant="outline" size="xl" className="w-full">
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter your confirm password"
                  />
                  <InputSlot className="pr-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
                {error && <Text className="text-red-500">{error.message}</Text>}
              </>
            )}
          />
        </VStack>

        <Button size="xl" variant="solid" className="bg-blue-500 w-2/4" onPress={handleSubmit(onSubmit)}>
          <ButtonText>Change</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
