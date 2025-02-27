import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon, IconProps } from '@rneui/base'

type Props = {
    title: string;
    iconProps: IconProps;
    onPress?: () => void;
}

const IconFunction = ({ title, iconProps, onPress }: Props) => {
    return (
        <TouchableOpacity className="w-1/4 p-2 items-center" onPress={onPress}>
            < Icon
                {...iconProps}
                size={30}
                className='bg-white p-4 rounded-full'
            />
            <Text className="text-black text-lg mt-2 text-center font-medium">{title}</Text>
        </TouchableOpacity >
    )
}

export default IconFunction