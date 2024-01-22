import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles, bgPattern, gradientColors } from '../../../styles/Styles'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Register } from '../../../utils/firebase/register';
import { getContainerStyles } from '../Init';
import { RFValue } from 'react-native-responsive-fontsize';

interface InitProps {
  navigation: any;
}


export default function Email({ navigation }) {
  const {
    Formik,
    formikValues,
    formValidation,
    // nextStepEmail,
    setFormikValues,
    onSubmit,
  } = Register({ navigation })

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ImageBackground source={bgPattern} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>
        <View style={styles.emailVIEW}>
          <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('NewAccount-2')}>
                <AntDesign name="leftcircle" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <Image style={{ height: 190, resizeMode: 'contain', marginBottom: 10 }} source={require('../../../../assets/png/email.png')} />
            </View>
            <View style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', width: 200, alignItems: "flex-start", marginLeft: 32 }}>
              <Text style={styles.bigTXT}>{formikValues.name}</Text>
              <Text style={styles.subTitleTXT}>Informe um {"\n"}<Text style={styles.underline}>Email</Text> Para{"\n"}Sua Conta </Text>
            </View>

            <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
              <KeyboardAvoidingView style={{ width: '100%' }}>
                <Formik
                  initialValues={formikValues}
                  validationSchema={formValidation}
                  onSubmit={() => { onSubmit(formikValues as never); }}
                >
                  {({ handleChange, values }) => (
                    <>
                      <TextInput
                        label="Email"
                        mode="outlined"
                        onChangeText={(text) => {
                          handleChange('email')(text);
                          setFormikValues({
                            ...formikValues,
                            email: text,
                          });
                        }} value={values.email}
                        left={<TextInput.Icon icon="email" />}
                        style={{ width: '100%', marginTop: 10, backgroundColor: "rgba(255, 255, 255, 0.72);" }}
                      />
                      <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                          <TouchableOpacity style={styles.beginButton} onPress={() => { onSubmit(values) }}>
                            <Text style={styles.buttonText}>Continuar <AntDesign name="arrowright" size={15} color="black" /></Text>
                          </TouchableOpacity>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', gap: 30, justifyContent: 'center', marginTop: 10, alignContent: 'center' }}>
                          <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
                          <FontAwesome name="circle-o" size={20} color="#A1E3AF" />
                          <FontAwesome name="circle" size={20} color="#A1E3AF" />
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
  emailVIEW: {
    ...getContainerStyles()
  },
  bigTXT: {
    fontSize: RFValue(22),
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  subTitleTXT: {
    fontSize: RFValue(18),
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
    marginTop: 45,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: 200,
  }
})