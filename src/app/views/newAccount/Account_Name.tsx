import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder, KeyboardAvoidingView, ScrollView, ScrollViewBase } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles } from '../../../styles/Styles'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Register } from '../../../utils/firebase/register';
import { RFValue } from 'react-native-responsive-fontsize';
import { getContainerStyles } from '../Init';

interface InitProps {
  navigation: any;
}


export default function Name({ navigation }) {

  const {
    Formik,
    initialValues,
    formValidation,
    nextStepName,
  } = Register({ navigation })


  return (
    <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={styles.container}>
      <View style={styles.account1VIEW}>
        <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Start')}>
              <AntDesign name="leftcircle" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
            <Image style={{ width: '90%', resizeMode: 'contain' }} source={require('../../../../assets/png/begin_box_phone.png')} />
            <Text style={styles.bigTXT}>Vamos começar </Text>
            <Text style={styles.subTitleTXT}>Qual é Seu <Text style={styles.underline}>Nome?</Text> </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: "center" }}>
            <KeyboardAvoidingView style={{ width: '100%' }}>
              <Formik
                initialValues={initialValues}
                validationSchema={formValidation}
                onSubmit={(values) => { nextStepName(values as never); }}
              >
                {({ handleChange, values }) => (
                  <>
                    <TextInput
                      label="Nome"
                      mode="outlined"
                      onChangeText={handleChange('name')}
                      value={values.name}
                      left={<TextInput.Icon icon="account-outline" />}
                      style={{ width: '100%', backgroundColor: "rgba(255, 255, 255, 0.72);" }}
                    />
                    <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center", gap: 16 }}>
                      <View style={{justifyContent: 'center', alignContent: 'center'}}>
                        <TouchableOpacity style={styles.beginButton} onPress={() => { nextStepName(values as never); }}>
                          <Text style={styles.buttonText}>Continuar<AntDesign name="arrowright" size={15} color="black" /></Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', gap: 30, justifyContent: 'center', alignContent: 'center' }}>
                        <FontAwesome name="circle" size={20} color="#A1E3AF" />
                        <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
                        <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </KeyboardAvoidingView>
          </View>
        </LinearGradient>
      </View >
    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B9FFCA',
  },
  account1VIEW: {
    ...getContainerStyles(),

  },
  bigTXT: {
    fontSize: RFValue(25),
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  subTitleTXT: {
    fontSize: RFValue(20),
    marginTop: 5,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#F7DC6F",
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    fontVariant: ['small-caps'],
  },
  beginButton: {
    backgroundColor: "#FFD52D",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 15,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '60%',
  }
})