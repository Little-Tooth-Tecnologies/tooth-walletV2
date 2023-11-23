import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../../styles/Styles'

export default function Home() {
  return (
    <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
      <Text>Home</Text>
    </LinearGradient>
  )
}