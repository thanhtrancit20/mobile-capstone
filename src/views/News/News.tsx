import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { StackProps } from '@/src/navigator/stack';
import { useGetAllBlogs } from '@/src/queries/Blogs';
import { formatDate } from '@/src/utils';
import { useEffect } from 'react';

export default function News({ navigation }: StackProps) {
  const { blogs, isFetching, onGetAllBlogs, setParams } = useGetAllBlogs();
  const mobileBlogs = blogs.filter((item) => item.isMobile)

  useEffect(() => {
    setParams({ page: 1, pageSize: 10 });
  }, [setParams]);

  const latestNews = blogs[0];
  const otherNews = blogs.slice(1);

  const handleNewsDetailPress = (id: string) => {
    navigation.navigate("NewsDetailStack", { newsId: id });
  };

  return (
    <ScrollView className="bg-gray-100 flex-1 p-5">
      <TouchableOpacity onPress={() => onGetAllBlogs()} className="bg-blue-500 p-3 rounded-lg mb-4">
        <Text className="text-white text-center font-bold">Tải lại</Text>
      </TouchableOpacity>

      {isFetching && <ActivityIndicator size="large" color="#0000ff" className="mb-4" />}

      {latestNews && (
        <TouchableOpacity className="mb-5" onPress={() => handleNewsDetailPress(latestNews.id.toString())}>
          <Image
            source={{ uri: 'https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg' }}
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-lg font-bold mt-3" numberOfLines={1}>{latestNews.title}</Text>
          <Text className="text-base mt-3">{formatDate(latestNews.createdDate)}</Text>
        </TouchableOpacity>
      )}

      <FlatList
        className='mb-5'
        data={otherNews}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNewsDetailPress(item.id.toString())} className="flex-row bg-white mb-3 rounded-lg shadow-md">
            <Image
              source={{ uri: 'https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg' }}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-3 flex-1 justify-center">
              <Text className="text-lg font-semibold" numberOfLines={2}>{item.title}</Text>
              <Text className="text-base">{formatDate(item.createdDate.toString())}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}