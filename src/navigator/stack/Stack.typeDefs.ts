import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  HomeStack: undefined;
  HomeFunctionsStack: undefined;
  DetailsStack: { from: string };
  ProfileStack: undefined;
  // add more screen props...
  LoginStack: undefined;
  ForgotPasswordStack: undefined;

  SettingsStack: undefined;
  EditProfileStack: undefined;
  DrawerNavigator: undefined;
  LoginStackNavigator: undefined;
  TabNavigator: undefined;
  NewsStack: undefined;
  NewsDetailStack: { newsId: string };
  ChangePasswordStack: undefined;
  ScheduleScreenStack: undefined;
  CourseRegistration: undefined;
  ChatStack: undefined;
  ChatRoom: { recipientId: string };
  Privacy: undefined;
  Terms: undefined;
  ResetPassword: undefined;
  CheckYourEmail: { username: string };
  FaceRegister: undefined;
  Courses: undefined;
  CourseDetailTabs: { courseId: string };
  FaceLogin: { classSession: number };
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
