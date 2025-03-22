import React, { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList, StackProps } from './Stack.typeDefs';
import { StackHeaderLeft, StackHeaderTitle } from './components';
import { colors } from '@/src/theme';

// views
import Home from '@/src/views/Home';
import Details from '@/src/views/Details';
import Login from '@/src/views/Login';
import ForgotPassword from '@/src/views/ForgotPassword';
import Settings from '@/src/views/Settings';
import EditProfile from '@/src/views/EditProfile';
import HomeFunctions from '@/src/views/HomeFunctions';
import News from '@/src/views/News';
import NewsDetail from '@/src/views/NewsDetail';
import ChangePasword from '@/src/views/ChangePassword';
import CourseRegistration from '@/src/views/CourseRegistration';
import ChatRoom from '@/src/views/Chat/ChatRoom/ChatRoom';
import Chat from '@/src/views/Chat/Conversations/Chat';
import Privacy from '@/src/views/Privacy';
import Terms from '@/src/views/Terms';
import CheckYourEmail from '@/src/views/ForgotPassword/CheckYourEmail';
import ResetPassword from '@/src/views/ResetPassword/ResetPassword';

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.darkPurple },
  headerTitleStyle: { fontSize: 18 },
};

export function HomeStackNavigator({ navigation }: StackProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Home}
        name="HomeStack"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={HomeFunctions}
        name="HomeFunctionsStack"
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerTitle: () => <StackHeaderTitle title="All Functions" />,
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
      <Stack.Screen
        component={News}
        name="NewsStack"
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerTitle: () => <StackHeaderTitle title="News" />,
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
      <Stack.Screen
        component={NewsDetail}
        name="NewsDetailStack"
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerTitle: () => <StackHeaderTitle title="News Detail" />,
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
      <Stack.Screen
        component={CourseRegistration}
        name="CourseRegistration"
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerTitle: () => <StackHeaderTitle title="Course Registration" />,
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export function ChatStackNavigator({ navigation }: StackProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Chat}
        name="ChatStack"
        options={{
          title: 'Chat',
          // headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
      <Stack.Screen
        component={ChatRoom}
        name="ChatRoom"
        options={{
          title: 'ChatRoom',
          // headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
      <Stack.Screen
        component={Details}
        name="DetailsStack"
        options={{
          title: 'Details Stack',
          // headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
    </Stack.Navigator>
  );
}
export function SettingsStackNavigator({ navigation }: StackProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Settings}
        name="SettingsStack"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={EditProfile}
        name="EditProfileStack"
        options={{
          title: '',
          headerTitle: () => <StackHeaderTitle title="Student Information" />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
        }}
      />
      <Stack.Screen
        component={ChangePasword}
        name="ChangePasswordStack"
        options={{
          title: '',
          headerTitle: () => <StackHeaderTitle title="Change Password" />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
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
        component={Privacy}
        name="Privacy"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Terms}
        name="Terms"
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
      <Stack.Screen
        component={ResetPassword}
        name="ResetPassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CheckYourEmail}
        name="CheckYourEmail"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
