import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Pressable, Platform } from 'react-native';
import { useAuthStore } from '@/src/zustand/auth/useAuthStore';
import { useLogin } from '@/src/queries/Auth/useLogin';
import { Controller, useForm } from 'react-hook-form';
import { initialLoginFormValue, loginFormSchema, LoginFormType } from './helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { StackProps } from '@/src/navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetUserInfo } from '@/src/queries/Auth/useGetUserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from '@backpackapp-io/react-native-toast';
// import { VITE_PUBLIC_GOOGLE_CLIENT_ID_ANDROID, VITE_PUBLIC_GOOGLE_CLIENT_ID_WEB } from "@env";
// import * as Google from 'expo-auth-session/providers/google'
// import * as WebBrowser from 'expo-web-browser'
// import { DiscoveryDocument, makeRedirectUri, useAuthRequest } from 'expo-auth-session';

export default function Login({ navigation }: StackProps) {
  const { setUser, setTokens, clearAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // const config = {
  //   clientId: Platform.select({
  //     ios: 'YOUR_IOS_CLIENT_ID',
  //     android: '43230472112-gev21dtv0qds1oimajom87u2ddlgn1cg.apps.googleusercontent.com',
  //     default: '43230472112-qsp8kg4rf4mblh71teii637pphacgjb5.apps.googleusercontent.com',
  //   }),
  //   redirectUri: makeRedirectUri(),
  //   scopes: ['profile', 'email'],
  // };

  // const discovery: DiscoveryDocument = {
  //   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  //   tokenEndpoint: 'https://oauth2.googleapis.com/token',
  //   revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  //   userInfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  // };

  // const [request, response, promptAsync] = useAuthRequest(config, discovery);

  // const handleToken = () => {
  //   if (response?.type === 'success') {
  //     const token = response.authentication?.accessToken;
  //     console.log('Access Token:', token);
  //   } else {
  //     console.error('Authentication failed or no token available');
  //   }
  // };

  // useEffect(() => {
  //   handleToken();
  // }, [response]);

  const handleState = () => {
    setShowPassword(showState => !showState);
  };

  const onNavigate = () => {
    navigation.replace('TabNavigator');
  };

  const onForgotPassword = () => {
    navigation.navigate('ForgotPasswordStack', { from: 'Login' });
  };

  const onPrivacy = () => {
    navigation.navigate('Privacy');
  };

  const onTerms = () => {
    navigation.navigate('Terms');
  };

  const { onGetUserInfo } = useGetUserInfo({
    enabled: false,
    onSuccess: (data) => {
      setUser(data);
      setLoading(false)
      onNavigate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.result;
      AsyncStorage.setItem('accessToken', accessToken);
      setTokens(accessToken, refreshToken);
      if (accessToken) {
        onGetUserInfo();
      }
    },
    onError: (error) => {
      toast.error("Username or password is incorrect!");
      setLoading(false);
    },
  });
  const onSubmit = async (data: LoginFormType) => {
    setLoading(true)
    onLogin(data);
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: initialLoginFormValue,
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  });


  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fb]">
      <View className="flex items-center h-full w-full my-40">
        <Heading className="color-blue-600" size="3xl">
          Login
        </Heading>

        <VStack space="md" className="px-8 my-4">
          <Text className="text-black font-semibold text-xl">Username</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="xl" isInvalid={!!errors.username} className="w-full">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email address"
                  type="text"
                />
              </Input>
            )}
          />
        </VStack>

        <VStack space="md" className="px-8">
          <Text className="text-black font-semibold text-xl">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input variant="outline" size="xl" isInvalid={!!errors.password} className="w-full">
                <InputField
                  value={value}
                  onChangeText={onChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
        </VStack>

        <TouchableOpacity className="self-end px-8" onPress={onForgotPassword}>
          <Heading className="color-blue-600" size="md">
            Forgot Password?
          </Heading>
        </TouchableOpacity>

        <Button
          size="xl"
          variant="solid"
          className="bg-blue-500 w-2/4 my-5"
          onPress={handleSubmit(onSubmit)}
          // onPress={() => promptAsync()}
          isDisabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <ButtonText>Login</ButtonText>}
        </Button>

        <Text className="text-black">By logging into an account you are agreeing with our</Text>
        <HStack space="xs">
          <TouchableOpacity onPress={onTerms}><Text className="text-blue-600 font-bold">Terms and Conditions</Text></TouchableOpacity>
          <Text className="text-black">and</Text>
          <TouchableOpacity onPress={onPrivacy}><Text className="text-blue-600 font-bold">Privacy Statement</Text></TouchableOpacity>
        </HStack>
      </View>
    </SafeAreaView>
  );
}
