import { Text, View, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, FlatList, useWindowDimensions } from 'react-native';
import { StackParamList, StackProps } from '@/src/navigator/stack';
import RenderHTML from 'react-native-render-html';
import { RouteProp } from '@react-navigation/native';
import { Heading } from '@/components/ui/heading';
import { useGetPostById } from '@/src/queries/Blogs';

type NewsDetailRouteProp = RouteProp<StackParamList, "NewsDetailStack">;


export default function NewsDetail({ route }: { route: NewsDetailRouteProp }) {
  const { newsId } = route.params;
  const { blog } = useGetPostById({ id: newsId });

  const { width } = useWindowDimensions();

  return (
    <ScrollView className="bg-white flex-1">
      <Image
        source={{ uri: 'https://eiu.edu.vn/wp-content/uploads/2025/02/EIU1403-34-2048x1365.jpg' }}
        className="w-full h-56"
        resizeMode="cover"
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

