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

  // Fallback or default values if blog or its properties are null/undefined
  const thumbnailUrl = blog?.thumbnailUrl ? replaceLocalhost(blog.thumbnailUrl) : '';
  const content = blog?.content || '';  // Default to empty string if no content

  return (
    <ScrollView className="bg-white flex-1">
      {/* Only render Image if thumbnailUrl is valid */}
      {thumbnailUrl && (
        <Image
          source={{ uri: thumbnailUrl }}
          className="w-full h-56"
          resizeMode="stretch"
        />
      )}
      <View className='p-3'>
        <Heading className='text-md'>{blog?.title || "No Title"}</Heading>
        {/* Render HTML content only if content exists */}
        {content && (
          <RenderHTML
            contentWidth={width}
            source={{
              html: content,
            }}
            enableExperimentalMarginCollapsing={true}
            tagsStyles={{
              table: { borderWidth: 1, borderColor: "red", width: "100%" },
              tr: { borderBottomWidth: 1, borderColor: "#000" },
              th: { backgroundColor: "#f2f2f2", padding: 10, textAlign: "center" },
              td: { padding: 10, textAlign: "center" },
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

