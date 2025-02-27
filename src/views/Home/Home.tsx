import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackProps } from '@/src/navigator/stack';
import { Avatar, Icon } from '@rneui/base';
import { useGetUserInfo } from '@/src/queries/Auth/useGetUserInfo';
import { Heading } from '@/components/ui/heading';
import IconFunction from '@/src/components/IconFunction/IconFunction';
import { iconFunctions } from '@/src/components/IconFunction/iconFunctions';
import { HStack } from '@/components/ui/hstack';
import { ScheduleComponent } from '../ScheduleComponent/ScheduleComponent';

export const newsData = [
  {
    id: "1",
    title: "React Native 2025 Released! React Native 2025 Released! React Native 2025 Released! React Native 2025 Released! React Native 2025 Released! React Native 2025 Released!",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025",
    html:
      `<p style="font-size: 1.2rem; font-style: italic">
      Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat. 
    </p>
    <br/>
    <p style="color: red;">
      Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </p>`
  },
  {
    id: "2",
    title: "Top 10 UI Trends for Mobile Apps",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
  {
    id: "3",
    title: "How to Optimize Performance",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
  {
    id: "4",
    title: "Understanding State Management",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
  {
    id: "5",
    title: "Understanding State Management",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
  {
    id: "6",
    title: "Understanding State Management",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
  {
    id: "7",
    title: "Understanding State Management",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
  {
    id: "8",
    title: "Understanding State Management",
    image: "https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg",
    publishedDate: "25-02-2025"
  },
];
export default function Home({ navigation }: StackProps) {

  const { userinfo, isFetching, onGetUserInfo } = useGetUserInfo({
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
              <Icon name="notifications-outline" type="ionicon" color="#fff" size={20} className='bg-blue-400 p-2 rounded-full' />
            </TouchableOpacity>
          </View>
          <ScheduleComponent />
        </View>

        <View className='w-full'>
          <Heading className='text-2xl p-5'>Function</Heading>
          <View className="flex-row flex-wrap justify-start">
            {iconFunctions.slice(0, 8).map((item) => (
              <IconFunction
                key={item.id}
                title={item.title}
                iconProps={item.iconProps}
                onPress={item.title === "More" ? handleMorePress : undefined}
              />
            ))}
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
          data={newsData.slice(0, 4)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-white rounded-lg mx-2 w-60 shadow-md" onPress={() => handleNewsDetailPress(item.id)}>
              <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg" resizeMode="cover" />
              <Text className="text-base font-semibold mt-2 px-1.5" numberOfLines={2}>{item.title}</Text>
              <Text className="text-base p-1.5">{item.publishedDate}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};