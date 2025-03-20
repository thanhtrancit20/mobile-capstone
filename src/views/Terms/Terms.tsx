import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackProps } from "@/src/navigator";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import { MaterialIcons } from "@expo/vector-icons";
import termsConditionsHTML from './helpers';

const Terms = ({ navigation }: StackProps) => {
    const { width } = useWindowDimensions();
    return (
        <SafeAreaView className="flex-1 bg-[#f7f7fb]">
            <ScrollView className='flex flex-1 mt-20 px-8' >

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        as={ChevronLeftIcon}
                        className="text-typography-500 w-8 h-8 bg-gray-200 border rounded-full p-5 mb-5"
                    />
                </TouchableOpacity>
                <RenderHTML
                    contentWidth={width}
                    source={{ html: termsConditionsHTML }}
                    tagsStyles={{
                        h2: { fontSize: 26, fontWeight: "bold", color: "#000" },
                        h3: { fontSize: 20, fontWeight: "bold", color: "#333" },
                        p: { fontSize: 18, lineHeight: 26, color: "black" },
                        ul: { fontSize: 18, lineHeight: 26, color: "black" },
                        li: { fontSize: 18, lineHeight: 26, color: "black" },
                    }} />
                <View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#007bff",
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            borderRadius: 8,
                            opacity: 1,
                        }}
                    >
                        <MaterialIcons name="check-circle" size={24} color="white" />
                        <Text style={{ marginLeft: 10, fontSize: 18, color: "white", fontWeight: "bold" }}>
                            Accept
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Terms