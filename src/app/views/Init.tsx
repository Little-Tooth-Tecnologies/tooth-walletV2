import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../styles/Styles'
import { colors } from '../../styles/appColors'

export default function Init() {
  return (
    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
      <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 230, height: 260, marginTop: 10 }} source={require('../../../assets/png/begin_box_phone.png')} />
          </View>
          <View>
            <Text style={[colors.white, styles.bigTXT]}> Finanças {"\n"} Pessoais Tão {"\n"} Simples {"\n"} Quanto um {"\n"}<Text style={[colors.yellow]}> Sorriso</Text></Text>
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
  }
})