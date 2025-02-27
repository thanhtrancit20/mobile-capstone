import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon, IconProps, ListItem } from '@rneui/base'
import { colors } from '@/src/theme';

type Props = {
    title: string;
    handleOnPress: () => void;
    iconProps: IconProps
}

const SettingOption = ({ title, handleOnPress, iconProps }: Props) => {
    return (
        <TouchableOpacity onPress={handleOnPress} className='border-b border-b-gray-300 '>
            <ListItem containerStyle={{ backgroundColor: colors.lightGrayPurple }} >
                <Icon {...iconProps} className='bg-gray-200 rounded-full p-3' />
                <ListItem.Content>
                    <ListItem.Title>{title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color="black" size={23} />
            </ListItem>
        </TouchableOpacity>
    )
}

export default SettingOption