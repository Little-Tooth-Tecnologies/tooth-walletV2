import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../styles/Styles'
import { colors } from '../../styles/appColors'
import { AntDesign } from '@expo/vector-icons';
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface InitProps {
  navigation: any;
}


export default function Init({ navigation }) {

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.translationY > -50) {
      navigation.navigate('Login');
    }
  };


  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
        <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <Image style={{ width: 230, height: 260, marginTop: 10 }} source={require('../../../assets/png/begin_box_phone.png')} />
            </View>
            <View style={{ width: 300, marginLeft: 10 }}>
              <Text style={[colors.white, styles.bigTXT]}>Finanças {"\n"}Pessoais Tão {"\n"}Simples {"\n"}Quanto um</Text>
              <Text style={{ color: "#F7DC6F", fontWeight: "bold", fontSize: 30 }}>Sorriso</Text>
              <Text style={colors.text_semi_white}>confiável, projetado para tornar o gerenciamento de finanças pessoais tão simples quanto um sorriso.</Text>
            </View>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
              <TouchableOpacity style={styles.beginButton} onPress={() => navigation.navigate('NewAccount')}>
                <Text style={styles.buttonText}>Começar</Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center", marginTop: 30 }}
            >
              <Text style={{ color: "#D5D5D5" }}>Já Tenho uma Conta</Text>
              <AntDesign name="down" size={24} color="#696788" />
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#B9FFCA',
  },
  bigTXT: {
    fontSize: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  beginButton: {
    backgroundColor: "#FFD52D",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 45,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: 200,
  }
})