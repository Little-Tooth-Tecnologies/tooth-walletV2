import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Routes from './src/routes/routes';


export default function App() {
  return (
      <Routes />    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9FFCA',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
