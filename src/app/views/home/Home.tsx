import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../../styles/Styles'
import UserNavigation from '../../components/UserNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function Home({ navigation }) {
  return (
    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={LocalStyles.container}>
      <ScrollView>
        <UserNavigation />
        <View style={LocalStyles.navegationContainer}>
          <View style={{flexDirection: 'row', gap: 3 }}>            
            <Image style={{ height: "100%", resizeMode: 'contain' }} source={require('../../../../assets/png/cellphone.png')} />
            <View style={{padding: 10}}>
              <Text style={LocalStyles.dialogTXT}>
                Parece que você não{"\n"}
                possui nenhum {"\n"}
                registro financeiro
                {"\n"}
                cadastrado,
                gostaria{"\n"}de cadastrar?
              </Text>
              <TouchableOpacity style={LocalStyles.yellowButton} onPress={() => navigation.navigate("add_balance")}>
                <Text style={LocalStyles.buttonTXT}>Cadastrar + </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={LocalStyles.navegationContainerBottom}>
          <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: "center" }}>
            <Text style={LocalStyles.titleTXT}> Registro de Despesas </Text>
            <View style={{ justifyContent: 'center', marginTop: 20, marginRight: 50 }}>
              <Image style={{ height: 150, resizeMode: 'contain' }} source={require('../../../../assets/png/no_items_main.png')} />
            </View>
            <View style={{ marginTop: 10, alignContent: 'center', justifyContent: 'center' }}>
              <Text style={{ color: "#9D9D9D", textTransform: 'uppercase' }}> Vazio por aqui..</Text>
              <View style={{ marginLeft: 30, }}>
                <TouchableOpacity style={LocalStyles.yellowButton2} onPress={() => navigation.navigate("add_spend")}>
                  <Text style={LocalStyles.buttonTXT2}> + </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  navegationContainerBottom: {
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: 35,
    marginBottom: '7%',
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
  yellowButton: {
    backgroundColor: "#FFD52D",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  buttonTXT: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  dialogTXT: {
    color: '#9D9D9D',
    fontSize: 16,
    width: '95%',
    fontFamily: 'Roboto',    
    fontVariant: ['small-caps'],
  },
  titleTXT: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
  },
  yellowButton2: {
    backgroundColor: "#FFD52D",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTXT2: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})