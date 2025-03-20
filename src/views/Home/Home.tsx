import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackProps } from '@/src/navigator/stack';
import { Avatar, Icon } from '@rneui/base';
import { useGetUserInfo } from '@/src/queries/Auth/useGetUserInfo';
import { Heading } from '@/components/ui/heading';
import { iconFunctions } from '@/src/components/IconFunction/iconFunctions';
import { HStack } from '@/components/ui/hstack';
import { ScheduleComponent } from '../../components/ScheduleComponent/ScheduleComponent';
import { useGetAllBlogs } from '@/src/queries/Blogs';
import { formatDate } from '@/src/utils';
import HomeIcon from '@/src/components/HomeIcon/HomeIcon';
import { useAuthStore } from '@/src/zustand/auth/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }: StackProps) {

  const { userinfo, isFetching, onGetUserInfo } = useGetUserInfo({
    enabled: true,
  });

  const { blogs, setParams, totalElements } = useGetAllBlogs({
    enabled: true,
  });

  const handleMorePress = () => {
    navigation.navigate("HomeFunctionsStack");
  };

  const handleAllNewsPress = () => {
    navigation.navigate("NewsStack");
  }

  const handleNewsDetailPress = (id: string) => {
    navigation.navigate("NewsDetailStack", { newsId: id })
  }

  const { clearAuth } = useAuthStore();

  const LogOut = async () => {
    clearAuth();
    await AsyncStorage.setItem("accessToken", "")
    await AsyncStorage.setItem("refreshToken", "")
    navigation.replace("LoginStackNavigator")
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fb]">
      <View className="w-full h-full">
        <View className="w-full h-1/4 bg-blue-500 px-5 pt-14">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Avatar
                rounded
                size={40}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1154/1154987.png' }}
                containerStyle={{ borderWidth: 1, borderColor: 'white' }}
              />
              <Text className='text-white text-xl ml-4'>Hello, {userinfo?.lastName}!</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("DetailsStack", { from: "Home" })}>
              <Icon name="notifications-outline" type="ionicon" color="#fff" size={20} onPress={() => LogOut()} className='bg-blue-400 p-2 rounded-full' />
            </TouchableOpacity>
          </View>
          <ScheduleComponent />
        </View>

        <View className='w-full'>
          <Heading className='text-2xl p-5'>Function</Heading>
          <View className="flex-row flex-wrap justify-start">
            {iconFunctions.slice(0, 7).map((item) => (
              <HomeIcon
                key={item.id}
                title={item.title}
                iconProps={item.iconProps}
                screenName={item.screenName}
              />
            ))}
            <HomeIcon
              key="more"
              title="More"
              iconProps={{ name: "ellipsis1", type: "antdesign", color: "gray" }}
              screenName="HomeFunctionsStack"
            />
          </View>
        </View>

        <HStack className='w-full items-center justify-between px-5 py-2'>
          <Heading className='text-2xl'>News</Heading>
          <TouchableOpacity className='flex-row items-center' onPress={handleAllNewsPress}>
            <Text className='text-lg'>View All</Text>
            <Icon name='right' type='antdesign' size={15} />
          </TouchableOpacity>
        </HStack>
        <FlatList
          className='max-h-64'
          data={blogs.slice(0, 4)}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-white rounded-lg mx-2 w-60 shadow-md" onPress={() => handleNewsDetailPress(item.id.toString())}>
              <Image source={{ uri: `http://10.0.2.2:8085${item.thumbnailUrl}` }} className="w-full h-40 rounded-lg" resizeMode="cover" />
              <Text className="text-base font-semibold mt-2 px-1.5" numberOfLines={2}>{item.title}</Text>
              <Text className="text-base p-1.5">{formatDate(item.createdDate)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};