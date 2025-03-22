import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon, IconProps } from '@rneui/base'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@/src/navigator';

type Props = {
    title: string;
    iconProps: IconProps;
    screenName: keyof StackParamList;
}

const IconFunction = ({ title, iconProps, screenName }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    return (
        <TouchableOpacity
            className="w-1/3 p-2 items-center justify-center border border-gray-200"
            onPress={() => navigation.navigate(screenName)}
        >
            <Icon
                {...iconProps}
                size={30}
                className='bg-white rounded-full'
            />
            <Text className="text-black text-lg mt-2 text-center font-medium">{title}</Text>
        </TouchableOpacity>
    )
}

export default IconFunction