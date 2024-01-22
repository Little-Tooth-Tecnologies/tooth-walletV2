import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles, bgPattern, gradientColors } from '../../../styles/Styles'
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


export default function Password({ navigation }) {


  const {
    Formik,
    formikValues,
    formValidation,
    nextStepPassword,
  } = Register({ navigation })



  return (

    <LinearGradient colors={gradientColors} style={styles.container}>
      <ImageBackground source={bgPattern} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>
        <View style={styles.account2VIEW}>
          <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('NewAccount-1')}>
                <AntDesign name="leftcircle" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'space-around', alignItems: "center" }}>
              <Image style={{ width: 190, resizeMode: 'contain' }} source={require('../../../../assets/png/security_pass.png')} />
            </View>

            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Text style={styles.bigTXT}>{formikValues.name}{"\n"}Certo ?</Text>
              <Text style={styles.subTitleTXT}>Crie uma {"\n"}<Text style={styles.underline}>Senha</Text> Para{"\n"}Sua Conta </Text>
            </View>

            <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
              <KeyboardAvoidingView style={{ width: '100%' }}>
                <Formik
                  initialValues={formikValues}
                  validationSchema={formValidation}
                  onSubmit={(values) => { nextStepPassword(values as never); }}
                >
                  {({ handleChange, values }) => (
                    <>
                      <TextInput
                        label="Senha"
                        mode="outlined"
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        value={values.password}
                        left={<TextInput.Icon icon="lock" />}
                        style={{ width: '100%', marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.72);" }}
                      />
                      <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>

                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                          <TouchableOpacity style={styles.beginButton} onPress={() => { nextStepPassword(values as never); }}>
                            <Text style={styles.buttonText}>Continuar <AntDesign name="arrowright" size={15} color="black" /></Text>
                          </TouchableOpacity>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', gap: 30, justifyContent: 'center', marginTop: 30, alignContent: 'center' }}>
                          <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
                          <FontAwesome name="circle" size={20} color="#A1E3AF" />
                          <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
                        </View>
                      </View>
                    </>
                  )}
                </Formik>
              </KeyboardAvoidingView>

            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#B9FFCA',
  },
  account2VIEW: {
    ...getContainerStyles()
  },
  bigTXT: {
    fontSize: RFValue(22),
    fontWeight: '400',
    textAlign: 'left',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  subTitleTXT: {
    fontSize: RFValue(18),
    marginTop: 5,
    textAlign: 'left',
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
    width: 200,
  }
})