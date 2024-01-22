import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import UserNavigation from '../../components/UserNavigation'
import SimpleNavigation from '../../components/SimpleNavigation'
import { gradientColors, bgPattern } from '../../../styles/Styles'

const Add_Spend = () => {
  return (
    <LinearGradient colors={gradientColors} style={LocalStyles.container}>
      <ImageBackground source={bgPattern} style={{ flex: 1 }} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>            
      <SimpleNavigation title='Despesas' />
        <View style={LocalStyles.navegationContainer}>

        </View>
      </ImageBackground>
    </LinearGradient>
  )
}

const LocalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navegationContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 35,
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 5,
  },
})

export default Add_Spend