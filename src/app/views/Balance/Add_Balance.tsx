import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import UserNavigation from '../../components/UserNavigation'
import {Icon, TextInput } from 'react-native-paper'
import IconSelector from './IconSelector'
import { TextInputMask } from 'react-native-masked-text'


const Add_Balance = () => {


  const [moneyValue, setMoneyValue] = React.useState('0');



  return (
    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={LocalStyles.container}>
      <UserNavigation />
      <View style={LocalStyles.navegationContainer}>      
        <View style={{flexDirection:"row", justifyContent: 'space-around'}}>
          {/* <Image source={require('../../../../assets/png/default_profile.png')} style={{ width: 50, height: 50, }} /> */}
          <View style={{zIndex: 1000}}>
            <IconSelector/>                  
          </View>
          <TextInput style={{backgroundColor: '#fff', width: 250}} label="Nome da Conta" />
        </View>

        <View style={{flexDirection:"row", justifyContent: 'flex-start'}}>
          <TextInput style={{backgroundColor: '#fff', width: 300, marginBottom: 20}} label="Descrição da Conta" />
        </View>

        <View style={{justifyContent:'flex-start', alignContent:'flex-start', alignItems: 'flex-start'}}>
          <Text> Valor:</Text>
          <TextInputMask
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$ ',
          }}
          value={moneyValue}
          onChangeText={(formatted) => setMoneyValue(formatted)}
          keyboardType='numeric'
          style={{marginLeft: 5}}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
          <TouchableOpacity style={LocalStyles.greenButton}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}> Registrar </Text>
              <Icon source="plus" size={20} color="#000000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={LocalStyles.redButton}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}> Cancelar </Text>
              <Icon source="delete" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  redButton: {
    backgroundColor: '#FF7979',
    color: "000000",
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenButton: {
    backgroundColor: '#A1E3AF',
    color: "#000000",
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Add_Balance