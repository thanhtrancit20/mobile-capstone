import { Text, View, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, FlatList, useWindowDimensions } from 'react-native';
import { StackParamList, StackProps } from '@/src/navigator/stack';
import RenderHTML from 'react-native-render-html';
import { RouteProp } from '@react-navigation/native';
import { newsData } from '../Home/Home';
import { Heading } from '@/components/ui/heading';

type NewsDetailRouteProp = RouteProp<StackParamList, "NewsDetailStack">;


export default function NewsDetail({ route }: { route: NewsDetailRouteProp }) {
  const { newsId } = route.params;
  const news = newsData[0];
  const { width } = useWindowDimensions();

  return (
    <ScrollView className="bg-gray-100 flex-1">
      <Image
        source={{ uri: news.image }}
        className="w-full h-56"
        resizeMode="cover"
      />
      <View className='p-3'>
        <Heading className='text-md'>{news.title}</Heading>
        <RenderHTML
          contentWidth={width}
          source={{
            html: news.html
          }}
          enableExperimentalMarginCollapsing={true}
        />
      </View>

    </ScrollView>
  );
};

