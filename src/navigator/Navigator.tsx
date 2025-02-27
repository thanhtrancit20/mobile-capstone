import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackNavigator, StackParamList } from './stack';
import Login from '../views/Login';
import DrawerNavigator from './drawer';
import TabNavigator from './tab';

const Stack = createNativeStackNavigator<StackParamList>();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginStackNavigator" component={LoginStackNavigator} options={{
          headerShown: false
        }} />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
