import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../../styles/Styles'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

interface InitProps {
  navigation: any;
}


export default function Finish({ navigation }) {
  return (
    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
      <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <Image style={{ height: 230, resizeMode: 'stretch', marginBottom: 20 }} source={require('../../../../assets/png/confirmed_login.png')} />
            <View style={styles.underline}></View>
          </View>
          <View style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', width: 200, alignItems: "flex-start", marginLeft: 32 }}>
            <Text style={styles.bigTXT}>Cadastro Realizado Com{"\n"}<Text style={{ color: "#F7DC6F", fontWeight: '700' }}>SUCESSO</Text></Text>
            <Text style={styles.subTitleTXT}>Estamos Redirecionando Você para página principal</Text>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <Text style={styles.toothWallet}> Bem Vindo ao {"\n"} Tooth Wallet </Text>
            <ActivityIndicator animating={true} color='#D9D9D9' size={50} style={{marginTop: 30}}/>
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
    fontSize: 24,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  toothWallet: {  
      fontSize: 13,
      marginTop: 30,
      fontWeight: '600',
      fontVariant: ['small-caps'],
      color: "#FFD52D",    
  },
  subTitleTXT: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#E4E4E4",
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