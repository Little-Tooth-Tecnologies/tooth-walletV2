import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../styles/Styles'
import { colors } from '../../styles/appColors'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';

interface InitProps {
  navigation: any;
}


export default function Init({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (

    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
      <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Start')}>
              <AntDesign name="leftcircle" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <Text style={styles.bigTXT}> Tooth Wallet </Text>
            <View style={styles.underline}></View>
            <Text style={styles.subTitleTXT}> Tela de Login </Text>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <TextInput
              label="Email"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              style={{ width: 250, marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.72);" }}
            />
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock" />}
              right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}
              style={{ width: 250, marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.72);" }}
            />
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <TouchableOpacity style={styles.beginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 290, height: 260, marginTop: 40 }} source={require('../../../assets/png/login_icon.png')} />
          </View>
        </LinearGradient>
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
  bigTXT: {
    fontSize: 30,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  subTitleTXT: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  underline: {
    backgroundColor: '#fff',
    height: 2,
    width: '80%',
    marginTop: 1,
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