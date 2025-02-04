import { Provider } from 'react-redux';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/navigator';
import store from './src/utils/store';
import { QueryClient, QueryClientProvider } from "react-query"
import { ONE_HOUR } from './src/config/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: ONE_HOUR,
      onError(err: unknown | Error) {
        console.error(err);
      },
    },
    mutations: {
      onError(err: unknown | Error) {
        console.error(err);
      },
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <Navigator />
          </Provider>
        </GestureHandlerRootView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
