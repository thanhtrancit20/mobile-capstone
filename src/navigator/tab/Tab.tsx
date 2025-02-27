import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { TabParamList, TabBarStatus } from './Tab.typeDefs';
import { HomeStackNavigator, ProfileStackNavigator, SettingsStackNavigator } from '../stack/Stack';

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabBarIcon = (tabName: keyof TabParamList) => (tabStatus: TabBarStatus) => {
  switch (tabName) {
    case 'HomeTab':
      return <AntDesign name="home" size={24} color={tabStatus.color} />;
    case 'ProfileTab':
      return <AntDesign name="profile" size={24} color={tabStatus.color} />;
    case 'SettingsTab':
      return <AntDesign name="setting" size={24} color={tabStatus.color} />;
  }
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route.name),
        headerShown: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveTintColor: colors.blue,
        tabBarActiveBackgroundColor: colors.white,
      })}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
