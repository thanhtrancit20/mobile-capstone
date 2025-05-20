import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type TabBarStatus = {
  focused: boolean;
  color: string;
  size: number;
};

export type TabParamList = {
  HomeTab: undefined;
  ChatTab: undefined;
  SettingsTab: undefined;
  CourseTab: undefined
  // add more tab params...
};

export type TabProps = BottomTabScreenProps<TabParamList, keyof TabParamList>;
