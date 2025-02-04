import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackNavigator, StackParamList } from './stack';
import Login from '../views/Login';
import DrawerNavigator from './drawer';

const Stack = createNativeStackNavigator<StackParamList>();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginStackNavigator" component={LoginStackNavigator} options={{
          headerShown: false
        }} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;
