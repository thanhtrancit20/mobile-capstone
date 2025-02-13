import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  HomeStack: undefined;
  DetailsStack: { from: string };
  ProfileStack: undefined;
  // add more screen props...
  LoginStack: undefined;
  ForgotPasswordStack: { from: string };

  SettingsStack: undefined;

  DrawerNavigator: undefined;
  LoginStackNavigator: undefined;
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
