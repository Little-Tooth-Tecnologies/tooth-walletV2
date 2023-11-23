import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto'
import { useNavigation } from '@react-navigation/native'

export default function Splash(props: any) {  

  const [msgTxt, setMsgTxt] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const stateChange = async () => {
      setMsgTxt('Carregando...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMsgTxt('Um Minuto...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMsgTxt('Quase lá...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMsgTxt('Pronto!');
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.navigate('Start' as never)
    }
    stateChange();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <LinearGradient colors={["#A1E3AF", "#FFFFFFFF"]} style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.imageView}>
        <Image style={{ width: 170, height: 170 }} source={require('../../../assets/favicon.png')} />
        <Text style={styles.textStyle}>Tooth Wallet</Text>        
      </View>
      <View style={styles.textView}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={{fontSize: 20, color: '#282828', marginTop: 20}}>{msgTxt}</Text>      
      </View>      
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#B9FFCA',
  },
  imageView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: '60%'
  },
  textView: {    
    gap: 15, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    fontFamily: 'Roboto_400Regular',
    fontSize: 30,    
    color: '#2E7D32',            
  }
})