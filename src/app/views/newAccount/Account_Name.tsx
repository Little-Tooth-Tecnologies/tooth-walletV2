import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../../styles/Styles'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

interface InitProps {
  navigation: any;
}


export default function Name({ navigation }) {    
  return (

    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
      <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Start')}>
              <AntDesign name="leftcircle" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 200, height: 260 }} source={require('../../../../assets/png/begin_box_phone.png')} />
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', width: 200, alignItems: "center" }}>
            <Text style={styles.bigTXT}>Vamos começar </Text>
            <Text style={styles.subTitleTXT}>Qual é Seu <Text style={styles.underline}>Nome?</Text> </Text>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <TextInput
              label="Nome"
              mode="outlined"
              left={<TextInput.Icon icon="account-outline" />}
              style={{ width: 220, marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.72);" }}
            />
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <TouchableOpacity style={styles.beginButton} onPress={() => navigation.navigate('NewAccount-2')}>
              <Text style={styles.buttonText}>Continuar <AntDesign name="arrowright" size={15} color="black" /></Text>
            </TouchableOpacity>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 30 , justifyContent: 'center', marginTop: 30, alignContent: 'center'}}>
            <FontAwesome name="circle" size={20} color="#A1E3AF" />
            <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
            <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
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
  subTitleTXT: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#F7DC6F",
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',    
  },  
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ['small-caps'],
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