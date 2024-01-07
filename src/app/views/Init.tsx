import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../styles/Styles'
import { colors } from '../../styles/appColors'
import { AntDesign } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import React from 'react'

export default function Init({ navigation }) {
  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationY > -50) {
      navigation.navigate('Login');
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
        <View style={styles.homeVIEW}>
          <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
            <View style={styles.imageVIEW}>
              <Image style={{ height: 190, resizeMode: 'contain', marginTop: 10 }} source={require('../../../assets/png/begin_box_phone.png')} />
            </View>
            <View style={styles.textVIEW}>
              <Text style={[colors.white, styles.bigTXT]}>Finanças {"\n"}Pessoais Tão {"\n"}Simples {"\n"}Quanto um</Text>
              <Text style={{ color: "#F7DC6F", fontWeight: "bold", fontSize: RFValue(22) }}>Sorriso</Text>
              <Text style={colors.text_semi_white}>confiável, projetado para tornar o gerenciamento de finanças pessoais tão simples quanto um sorriso.</Text>
            </View>
            <View style={styles.buttonVIEW}>
              <TouchableOpacity style={styles.beginButton} onPress={() => navigation.navigate('NewAccount-1')}>
                <Text style={styles.buttonText}>Começar</Text>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: "#D5D5D5" }}>Já Tenho uma Conta</Text>
                <AntDesign name="down" size={24} color="#696788" />
              </View>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </PanGestureHandler>
  )
}

const window = Dimensions.get('window');


export const getContainerStyles = () => {
  if (window.height <= 720 && window.width <= 1280) {
    return {
      height: window.height * 0.9,
      width: window.width * 0.7,
    };
  } else if (window.height >= 1080 && window.width >= 2040) {
    return {
      height: window.height * 0.9,
      width: window.width * 0.7,
    }
  } else {
    return {
      height: window.height * 0.8,
      width: window.width * 0.7,
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: '#B9FFCA',
  },
  homeVIEW: {    
    ...getContainerStyles()
  },
  imageVIEW: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  textVIEW: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  buttonVIEW: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
  bigTXT: {
    fontSize: RFValue(22),
  },
  buttonText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
  beginButton: {
    backgroundColor: "#FFD52D",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    // marginTop: 20,
    marginTop: window.height * 0.03,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '70%',
  },
})