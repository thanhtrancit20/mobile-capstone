import { Text, View, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, FlatList, useWindowDimensions } from 'react-native';
import { StackParamList, StackProps } from '@/src/navigator/stack';
import RenderHTML from 'react-native-render-html';
import { RouteProp } from '@react-navigation/native';
import { Heading } from '@/components/ui/heading';
import { useGetPostById } from '@/src/queries/Blogs';
import { replaceLocalhost } from '@/src/utils/replaceLocalhost';

type NewsDetailRouteProp = RouteProp<StackParamList, "NewsDetailStack">;

export default function NewsDetail({ route }: { route: NewsDetailRouteProp }) {
  const { newsId } = route.params;
  const { blog } = useGetPostById({ id: newsId });

  const { width } = useWindowDimensions();

  return (
    <ScrollView className="bg-white flex-1">
      <Image
        source={{ uri: replaceLocalhost(blog?.thumbnailUrl) }}
        className="w-full h-56"
        resizeMode="stretch"
      />
      <View className='p-3'>
        <Heading className='text-md'>{blog?.title}</Heading>
        <RenderHTML
          contentWidth={width}
          source={{
            html: blog?.content
          }}
          enableExperimentalMarginCollapsing={true}
          tagsStyles={{
            table: { borderWidth: 1, borderColor: "red", width: "100%" },
            tr: { borderBottomWidth: 1, borderColor: "#000" },
            th: { backgroundColor: "#f2f2f2", padding: 10, textAlign: "center" },
            td: { padding: 10, textAlign: "center" },
          }}
        />
      </View>

    </ScrollView>
  );
};

