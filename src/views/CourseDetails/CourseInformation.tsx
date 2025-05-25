import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import RenderHTML from 'react-native-render-html'

type Prop = {
    isFetching: boolean,
    courseInformation: string
}
const CourseInformation = ({ isFetching, courseInformation }: Prop) => {
    const { width } = useWindowDimensions();
    return (
        <View className="p-4">
            {isFetching ? (
                <View>
                    <Text>Đang tải...</Text>
                </View>
            ) : (
                <RenderHTML
                    contentWidth={width}
                    source={{ html: courseInformation }}
                    tagsStyles={{
                        h2: { fontSize: 26, fontWeight: "bold", color: "#000" },
                        h3: { fontSize: 20, fontWeight: "bold", color: "#333" },
                        p: { fontSize: 18, lineHeight: 26, color: "black" },
                        ul: { fontSize: 18, lineHeight: 26, color: "black" },
                        li: { fontSize: 18, lineHeight: 26, color: "black" },
                    }}
                />
            )}
        </View>
    )
}

export default CourseInformation