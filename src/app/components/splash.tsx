import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Splash() {
    
  return (
    <View style={styles.container}>
      <Text>splash</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B9FFCA',
    }
})