import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon, TextInput } from 'react-native-paper'
import IconSelector, { IconInt } from './IconSelector'
import { TextInputMask } from 'react-native-masked-text'
import SimpleNavigation from '../../components/SimpleNavigation'
import ColorPicker from '../../components/ColorPicker'
import { RFValue } from 'react-native-responsive-fontsize'
import { ScrollView } from 'react-native'
import uuid from 'react-native-uuid'
import ColorPickerALT from './../../components/ColorPicker alt';
import { bgPattern, gradientColors } from '../../../styles/Styles'



const Add_Balance = () => {

  const [moneyValue, setMoneyValue] = useState('0');
  const [color, setColor] = useState('#000000')
  const identifier = uuid.v4()
  const [icon, setIcon] = useState({})
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
  }

  const handleIconSelect = (NewIcon: IconInt) => {
    setIcon(NewIcon)
  }

  const SubmitBalance = async () => {
    const BalanceData = {
      id: identifier,
      name: name,
      description: description,
      value: moneyValue,
      color: color,
      icon: icon,
    }

    console.log(BalanceData)
  }

  const cancelBalance = async () => {
    setName('')
    setDescription('')
    setMoneyValue('0')
    setColor('#000000')
    setIcon({})

    const BalanceData = {
      // id: identifier,
      name: name,
      description: description,
      value: moneyValue,
      color: color,
      icon: icon,
    }

    console.log(BalanceData)
  }

  return (
    <LinearGradient colors={gradientColors} style={LocalStyles.container}>
      <ImageBackground source={bgPattern} style={{ flex: 1}} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>      
      <ScrollView>
        <SimpleNavigation title='Registro Financeiro' />
        <View style={LocalStyles.navegationContainer}>
          <View>
            <View style={{ zIndex: 1000, position: 'absolute', marginTop: 30 }}>
              <IconSelector color={color} onIconSelect={handleIconSelect} />
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: 100 }}>
              <TextInput
                style={{ backgroundColor: '#fff', width: RFValue(220) }}
                label="Nome"
                left={<TextInput.Icon icon="format-list-group" />}
                onChangeText={text => setName(text)}
              />
              <TextInput
                style={{ backgroundColor: '#fff', width: RFValue(220), marginBottom: 20 }}
                label="Descrição"
                left={<TextInput.Icon icon="format-list-group" />}
                onChangeText={text => setDescription(text)}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 30 }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 10 }}>
              <Text style={{ fontSize: 15, }}> Valor:</Text>
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
                style={{ marginLeft: 5, fontSize: 15 }}
              />
            </View>
            {/* <ColorPicker onColorChange={handleColorChange} /> */}
            <ColorPickerALT />
          </View>

          <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
            <TouchableOpacity style={LocalStyles.greenButton} onPress={SubmitBalance}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}> Registrar </Text>
                <Icon source="plus" size={20} color="#000000" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={LocalStyles.redButton} onPress={cancelBalance}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}> Cancelar </Text>
                <Icon source="delete" size={20} color="#000000" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginLeft: '7%',
    marginRight: '7%',
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