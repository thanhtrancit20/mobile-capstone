import React from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Button from '@/src/components/Button';
import { StackProps } from '@/src/navigator/stack';
import { colors } from '@/src/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 22,
    height: 44,
    width: '50%',
    backgroundColor: colors.lightPurple,
  },
});

export default function Profile({ navigation }: StackProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fb]">
      <Text style={styles.title}>Profile</Text>
      <Button
        title="Go to Details"
        titleStyle={styles.buttonTitle}
        style={styles.button}
        onPress={() => {
          navigation.navigate('DetailsStack', { from: 'Profile' });
        }}
      />
    </SafeAreaView>
  );
}
