import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { iconFunctions } from '@/src/components/IconFunction/iconFunctions'
import IconFunction from '@/src/components/IconFunction/IconFunction'
import { StackProps } from '@/src/navigator'

const HomeFunctions = ({ navigation }: StackProps) => {

    const handlePress = () => {
        console.log("Pressed")
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f7f7fb]">
            <View className="h-full w-full flex flex-col items-center mt-3">
                <View className="flex-row flex-wrap justify-start">
                    {iconFunctions.map((item) => (
                        <IconFunction
                            key={item.id}
                            title={item.title}
                            iconProps={item.iconProps}
                            screenName={item.screenName}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeFunctions