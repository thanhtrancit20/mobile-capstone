import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { images } from '@/src/theme';

export function StackHeaderTitle({ title }) {
  return <Text className='text-2xl text-white'>{title}</Text>
}
