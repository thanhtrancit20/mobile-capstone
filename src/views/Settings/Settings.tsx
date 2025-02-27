import { HStack } from '@/components/ui/hstack';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Button, Icon, ListItem } from '@rneui/base';
import { StackProps } from '@/src/navigator/stack';
import { useGetUserInfo } from '@/src/queries/Auth/useGetUserInfo';
import SettingOption from '@/src/components/SettingOption/SettingOption';

const Settings = ({ navigation }: StackProps) => {
  const settingOptions = [
    {
      id: 1,
      title: 'Student Information',
      handleOnPress: handleEdit,
      iconProps: { color: 'blue', name: 'idcard', type: 'antdesign', size: 20 },
    },
    {
      id: 2,
      title: 'Change Password',
      handleOnPress: handleChangePassword,
      iconProps: { color: '#366899', name: 'lock', type: 'material-icons', size: 20 },
    },
    {
      id: 3,
      title: 'Log Out',
      handleOnPress: handleLogOut,
      iconProps: { color: 'red', name: 'log-out', type: 'entypo', size: 20 },
    },
  ];

  const { userinfo, isFetching, onGetUserInfo } = useGetUserInfo({
    enabled: true,
  });

  function handleEdit() {
    navigation.navigate('EditProfileStack');
  }

  function handleLogOut() {
    navigation.replace('LoginStackNavigator');
  }

  function handleChangePassword() {
    navigation.navigate('ChangePasswordStack');
  }
  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fb]">
      <View className="h-full w-full flex flex-col">
        <HStack space="lg" alignItems="center" className="bg-blue-500 px-5 pt-12 pb-5">
          <Avatar
            size={70}
            rounded
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1154/1154987.png' }}
            // title="Bj"
            containerStyle={{ backgroundColor: 'grey' }}>
            <Avatar.Accessory
              size={23}
              style={{ backgroundColor: 'white' }}
              containerStyle={{ backgroundColor: 'white', borderRadius: 50 }}
              iconProps={{
                name: 'camerao',
                color: 'black',
                size: 15,
              }}
              type="antdesign"
            />
          </Avatar>
          <View>
            <Text className="text-2xl text-white font-semibold">
              {userinfo?.firstName} {userinfo?.lastName}
            </Text>
            <Text className="text-white text-lg">IRN: {userinfo?.studentId}</Text>
          </View>
        </HStack>

        <View className="justify-between flex-1 mb-5">
          <View className="p-2">
            {settingOptions.map(option => (
              <SettingOption
                key={option.id}
                title={option.title}
                handleOnPress={option.handleOnPress}
                iconProps={option.iconProps}
              />
            ))}
          </View>
          <View>
            <View
              className="mb-2"
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <Text className="text-center text-sm text-gray-500">App Version 2.3</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
