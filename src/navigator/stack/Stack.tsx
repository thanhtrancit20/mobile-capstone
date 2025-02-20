import React, { lazy } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList, StackProps } from './Stack.typeDefs';
import { StackHeaderLeft, StackHeaderTitle } from './components';
import { colors } from '@/src/theme';

// views
import Home from '@/src/views/Home';
import Details from '@/src/views/Details';
import Profile from '@/src/views/Profile';
import Login from '@/src/views/Login';
import ForgotPassword from '@/src/views/ForgotPassword';
import Settings from '@/src/views/Settings';
import EditProfile from '@/src/views/EditProfile';
const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
};

export function HomeStackNavigator({ navigation }: StackProps) {
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Home}
        name="HomeStack"
        options={{
          title: 'Home',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <StackHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        component={Details}
        name="DetailsStack"
        options={{
          title: 'Details',
          headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export function ProfileStackNavigator({ navigation }: StackProps) {
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Profile}
        name="ProfileStack"
        options={{
          title: 'Profile',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <StackHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        component={Details}
        name="DetailsStack"
        options={{
          title: 'Details',
          headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
export function SettingsStackNavigator({ navigation }: StackProps) {
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Settings}
        name="SettingsStack"
        options={{
          title: 'Setting',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <StackHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        component={EditProfile}
        name="EditProfileStack"
        options={{
          title: 'Edit Profile',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <StackHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export function LoginStackNavigator({ navigation }: StackProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Login}
        name="LoginStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ForgotPassword}
        name="ForgotPasswordStack"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
