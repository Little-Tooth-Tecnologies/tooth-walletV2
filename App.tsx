import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes/routes';
import { Provider } from 'react-redux';
import store from './src/utils/redux/store';
import { AuthProvider } from './src/utils/firebase/AuthContext';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </AuthProvider>
    </Provider>
  );
}