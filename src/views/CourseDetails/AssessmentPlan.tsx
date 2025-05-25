import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import RenderHTML from 'react-native-render-html'
import { CourseDetailResponse } from '@/src/queries/Courses/types'

type Prop = {
    isFetching: boolean,
    assessmentPlan: string
}
const AssessmentPlan = ({ isFetching, assessmentPlan }: Prop) => {
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
                    source={{ html: assessmentPlan }}
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

export default AssessmentPlan