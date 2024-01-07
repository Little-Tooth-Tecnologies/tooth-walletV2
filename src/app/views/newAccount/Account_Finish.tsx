import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../../styles/Styles'
import React, { useEffect } from 'react'
import { ActivityIndicator, Snackbar, TextInput } from 'react-native-paper';
import { Register } from '../../../utils/firebase/register';
import { getContainerStyles } from '../Init';
import { RFValue } from 'react-native-responsive-fontsize';

interface InitProps {
  navigation: any;
}


export default function Finish({ navigation }) {  
  
  const {show, infoMSG} = Register({ navigation })

  return (
    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
        <Snackbar visible={show} onDismiss={() => show} style={{zIndex: 1}}>{infoMSG}</Snackbar>
      <View style={styles.finishVIEW}>
        <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' , marginBottom: 20}}>
            <Image style={{ height: 230, resizeMode: 'stretch' }} source={require('../../../../assets/png/confirmed_login.png')} />
            <View style={styles.underline}></View>
          </View>
          <View style={{justifyContent: 'center', width: 200, alignItems: "center" }}>
            <Text style={styles.bigTXT}>Cadastro Realizado Com{"\n"}<Text style={{ color: "#F7DC6F", fontWeight: '700' }}>SUCESSO</Text></Text>
            <Text style={styles.subTitleTXT}>Estamos Redirecionando Você para página principal</Text>            
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <Text style={styles.toothWallet}> Bem Vindo ao {"\n"} Tooth Wallet </Text>
            <ActivityIndicator animating={true} color='#D9D9D9' size={50} style={{ marginTop: 10 }} />
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#B9FFCA',
  },
  finishVIEW: {
    ...getContainerStyles() 
  },
  bigTXT: {
    fontSize: RFValue(22),
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  toothWallet: {
    fontSize: RFValue(13),
    marginTop: 20,
    fontWeight: '600',
    fontVariant: ['small-caps'],
    color: "#FFD52D",
  },
  subTitleTXT: {
    fontSize: RFValue(18),
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
})