import { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { StackProps } from '@/src/navigator/stack';
import { useGetAllBlogs } from '@/src/queries/Blogs';
import { formatDate } from '@/src/utils';

export default function News({ navigation }: StackProps) {
  const { blogs, isFetching, onGetAllBlogs, setParams } = useGetAllBlogs();
  const [refreshing, setRefreshing] = useState(false);

  const mobileBlogs = blogs.filter((item) => item.isMobile);

  useEffect(() => {
    setParams({ page: 1, pageSize: 10 });
  }, [setParams]);

  const latestNews = blogs[0];
  const otherNews = blogs.slice(1);

  const handleNewsDetailPress = (id: string) => {
    navigation.navigate("NewsDetailStack", { newsId: id });
  };

  // Xử lý làm mới danh sách
  const onRefresh = async () => {
    setRefreshing(true);
    await onGetAllBlogs();
    setRefreshing(false);
  };

  return (
    <ScrollView
      className="flex-1 p-5 bg-[#f7f7fb]"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isFetching && <ActivityIndicator size="large" color="#0000ff" className="mb-4" />}

      {latestNews && (
        <TouchableOpacity className="mb-5" onPress={() => handleNewsDetailPress(latestNews.id.toString())}>
          <Image
            source={{ uri: `http://10.0.2.2:8085${latestNews.thumbnailUrl}` }}
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-lg font-bold mt-3" numberOfLines={2}>{latestNews.title}</Text>
          <Text className="text-base mt-3">{formatDate(latestNews.createdDate).toString() || ""}</Text>
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
              source={{ uri: `http://10.0.2.2:8085${item.thumbnailUrl}` }}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-3 flex-1 justify-center">
              <Text className="text-lg font-semibold" numberOfLines={2}>{item.title}</Text>
              <Text className="text-base">{formatDate(item.createdDate).toString() || ""}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}
