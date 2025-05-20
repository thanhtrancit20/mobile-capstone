import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import { useGetFaceVerified } from '@/src/queries/Auth/useGetFaceVerified';
import { Modal, Pressable } from 'react-native';
import { replaceLocalhost } from '@/src/utils/replaceLocalhost';

export default function Home({ navigation }: StackProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [isFaceVerifyModalVisible, setIsFaceVerifyModalVisible] = useState(false);


  const { userinfo, isFetching, onGetUserInfo } = useGetUserInfo({
    enabled: true,
  });


  const { blogs, setParams, totalElements, onGetAllBlogs } = useGetAllBlogs({
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
    // clearAuth();
    // await AsyncStorage.setItem("accessToken", "")
    // await AsyncStorage.setItem("refreshToken", "")
    // navigation.replace("LoginStackNavigator")
    navigation.navigate("FaceLogin");
  }
  const onRefresh = async () => {
    setRefreshing(true);
    await onGetAllBlogs();
    setRefreshing(false);
  };


  const { onGetFaceVerified } = useGetFaceVerified({
    enabled: true,
    onSuccess: (data) => {
      if (!data.faceVerified) {
        setIsFaceVerifyModalVisible(true);
      }
    },
  })

  useFocusEffect(
    useCallback(() => {
      onGetFaceVerified();
    }, [])
  );

  return (
    <View className="flex-1 bg-[#f7f7fb]">
      {/* Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={isFaceVerifyModalVisible}
        onRequestClose={() => setIsFaceVerifyModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="bg-white p-5 rounded-2xl w-4/5 items-center shadow-lg">
            <Text className="text-xl font-bold mb-3 text-center">Face Verification Required</Text>
            <Text className="text-base text-center mb-5">
              You need to complete face verification to use this feature.
            </Text>
            <Pressable
              onPress={() => {
                setIsFaceVerifyModalVisible(false);
                navigation.navigate("FaceRegister");
              }}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white text-base">Verify Now</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View className="h-40 bg-blue-500 px-5 pt-10">
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
          <TouchableOpacity onPress={() => LogOut()}>
            <Icon name="notifications-outline" type="ionicon" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lịch chồng giao giữa xanh và trắng */}
      <View className="absolute w-full top-28 z-10 px-5">
        <ScheduleComponent />
      </View>

      {/* Scrollable content */}
      <ScrollView
        className="flex-1 bg-[#f7f7fb]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingTop: 30 }}
      >
        <View className="bg-[#f7f7fb] rounded-t-3xl pt-5">
          <Heading className='text-2xl px-5'>Function</Heading>
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

          <HStack className='w-full items-center justify-between px-5 py-2 mt-4'>
            <Heading className='text-2xl'>News</Heading>
            <TouchableOpacity className='flex-row items-center' onPress={handleAllNewsPress}>
              <Text className='text-lg'>View All</Text>
              <Icon name='right' type='antdesign' size={15} />
            </TouchableOpacity>
          </HStack>

          <FlatList
            data={blogs.slice(0, 4)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-white rounded-lg mx-2 w-60 shadow-md"
                onPress={() => handleNewsDetailPress(item.id.toString())}
              >
                <Image
                  source={{ uri: replaceLocalhost(item.thumbnailUrl) }}
                  className="w-full h-40 rounded-lg"
                  resizeMode="cover"
                />
                <Text className="text-base font-semibold mt-2 px-1.5" numberOfLines={2}>{item.title}</Text>
                <Text className="text-base p-1.5">{formatDate(item.createdDate).toString() || ""}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};