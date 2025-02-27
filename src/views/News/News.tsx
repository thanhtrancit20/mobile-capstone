import { Text, View, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, FlatList, useWindowDimensions } from 'react-native';
import { StackProps } from '@/src/navigator/stack';
import { newsData } from '../Home/Home';
import RenderHTML from 'react-native-render-html';

export default function News({ navigation }: StackProps) {
  const latestNews = newsData[0];
  const otherNews = newsData.slice(1);

  const handleNewsDetailPress = (id: string) => {
    navigation.navigate("NewsDetailStack", { newsId: id })
  }

  return (
    <ScrollView className="bg-gray-100 flex-1 p-5">
      {latestNews && (
        <TouchableOpacity className="mb-5" onPress={() => { handleNewsDetailPress(latestNews.id) }}>
          <Image
            source={{ uri: latestNews.image }}
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-lg font-bold mt-3" numberOfLines={1}>{latestNews.title}</Text>
          <Text className="text-base mt-3">{latestNews.publishedDate}</Text>
        </TouchableOpacity>
      )}

      <FlatList
        className='mb-5'
        data={otherNews}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handleNewsDetailPress(item.id) }} className="flex-row bg-white mb-3 rounded-lg shadow-md">
            <Image
              source={{ uri: item.image }}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-3 flex-1 justify-center">
              <Text className="text-lg font-semibold">{item.title}</Text>
              <Text className="text-base ">{item.publishedDate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

