import { View, Text, StyleSheet, Image, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto'
import { useNavigation } from '@react-navigation/native'
import { bgPattern, gradientColors } from '../../styles/Styles'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export default function Splash(props: any) {

  const [msgTxt, setMsgTxt] = useState('')
  const navigation = useNavigation()

  const ImageViewtranslateY = useSharedValue(0)
  const TextViewtranslateY = useSharedValue(0)

  const handleAnimationStart = async () => {
    ImageViewtranslateY.value = withSpring(100, { damping: 20, stiffness: 90 });
    await new Promise(resolve => setTimeout(resolve, 500));
    ImageViewtranslateY.value = withSpring(90, { damping: 20, stiffness: 90 });
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const handleTextAnimationStart = async () => {
    TextViewtranslateY.value = withSpring(-100, { damping: 20, stiffness: 90 });
    await new Promise(resolve => setTimeout(resolve, 500));
    TextViewtranslateY.value = withSpring(-90, { damping: 20, stiffness: 90 });
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const handleAnimationFinish = async () => {
    ImageViewtranslateY.value = withSpring(-500, { damping: 20, stiffness: 90 });
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const handleTextAnimationFinish = async () => {
    TextViewtranslateY.value = withSpring(500, { damping: 20, stiffness: 90 });
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: ImageViewtranslateY.value }
      ]
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: TextViewtranslateY.value }
      ]
    }
  })

  useEffect(() => {
    const stateChange = async () => {
      handleTextAnimationStart();
      setMsgTxt('Carregando...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMsgTxt('Um Minuto...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMsgTxt('Quase lá...');
      await new Promise(resolve => setTimeout(resolve, 500));
      setMsgTxt('Pronto!');
      await new Promise(resolve => setTimeout(resolve, 500));

      handleAnimationFinish();
      handleTextAnimationFinish();

      await new Promise(resolve => setTimeout(resolve, 200));
      navigation.navigate('Start' as never);
    }
    stateChange();
  }, []);

  useEffect(() => {
    handleAnimationStart();
  }, [])

  let [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ImageBackground source={bgPattern} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>
        <StatusBar style="dark" />
        <View style={styles.imageView}>
          <Animated.View style={animatedViewStyle}>
            <Image style={{ width: 170, height: 170 }} source={require('../../../assets/favicon.png')} />
            <Text style={styles.textStyle}>Tooth Wallet</Text>
          </Animated.View>
        </View>
        <View style={styles.textView}>
          <Animated.View style={animatedTextStyle}>
            <ActivityIndicator size={50} color="#FFFFFF" />
            <Text style={{ fontSize: 20, color: '#FFFFFF', marginTop: 20 }}>{msgTxt}</Text>
          </Animated.View>
        </View>
      </ImageBackground>
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
    marginBottom: '70%',
  },
  textView: {
    gap: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 30,
    color: '#FFFFFF',
  }
})