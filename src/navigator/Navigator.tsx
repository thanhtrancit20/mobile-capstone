import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackNavigator, StackParamList } from './stack';
import TabNavigator from './tab';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import ForgotPassword from '../views/ForgotPassword';
import FaceLogin from '../views/FaceRegister/FaceLogin';
import FaceRegister from '../views/FaceRegister/FaceRegister';

const Stack = createNativeStackNavigator<StackParamList>();
const prefix = Linking.createURL('/');
const standalonePrefix = 'myapp://';

function Navigator() {
  console.log('🔗 Linking Prefix:', prefix);

  const linking = {
    prefixes: [prefix, standalonePrefix],
    config: {
      screens: {
        LoginStackNavigator: {
          path: 'login',
          screens: {
            ResetPassword: 'reset-password'
          },
        },
      },
    },
  };

  console.log('🔗 Linking Config:', linking);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('🚀 App được mở từ link:', url);
      } else {
        console.log('❌ Không có URL khi mở app');
      }
    });

    const subscription = Linking.addEventListener('url', (event) => {
      console.log('🔗 URL được mở khi app đang chạy:', event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer linking={linking} onStateChange={(state) => console.log("🛠 Navigation state changed:", state)}>
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
        <Stack.Screen name="FaceRegister" component={FaceRegister} options={{
          headerShown: false
        }} />
        <Stack.Screen name="FaceLogin" component={FaceLogin} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
