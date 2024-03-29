import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Styles, bgPattern, gradientColors } from '../../../styles/Styles'
import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Icon, Snackbar, TextInput } from 'react-native-paper';
import { AuthContext } from '../../../utils/firebase/AuthContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/store';
import { setStates } from '../../../utils/redux/appSlice';
import { LoginUtils } from '../../../utils/firebase/login';
import { RFValue } from 'react-native-responsive-fontsize';
import { getContainerStyles } from '../Init';

interface InitProps {
  navigation: any;
}


export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext)
  const dispatch = useDispatch();

  const {
    Formik,
    formValidation,
    formikValues,
    setFormikValues,
    onSubmit,
    commonStates
  } = LoginUtils({ navigation })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!authContext || !authContext.user) {
          dispatch(setStates({
            show: true,
            infoMSG: "Verificando Autenticação",
            loading: true
          }))

          await new Promise(resolve => setTimeout(resolve, 3000));
          dispatch(setStates({
            show: true,
            infoMSG: "Usuário Não Autenticado",
            loading: false,
          }))

          await new Promise(resolve => setTimeout(resolve, 4000));
          dispatch(setStates({
            show: false,
            infoMSG: ""
          }))

        } else {
          dispatch(setStates({
            show: true,
            infoMSG: "Verificando Autenticação",
            loading: true
          }))

          await new Promise(resolve => setTimeout(resolve, 2000));

          dispatch(setStates({
            show: true,
            infoMSG: "Usuário Autenticado",
            loading: false,
            sucess: true
          }))

          await new Promise(resolve => setTimeout(resolve, 4000));
          navigation.navigate('Home')

        }
      } catch (error) {
        dispatch(setStates({
          show: true,
          infoMSG: "Falha na Verificação de Autenticação",
          error: true,
        }))
        await new Promise(resolve => setTimeout(resolve, 4000));
        dispatch(setStates({
          show: false,
          infoMSG: "",
          error: false
        }))
      }
    }
    checkAuthentication();
  }, [])

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ImageBackground source={bgPattern} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>
        <Snackbar visible={commonStates.show} style={{ zIndex: 1 }} onDismiss={() => commonStates.show}>{commonStates.infoMSG}</Snackbar>
        <View style={styles.loginVIEW}>
          <LinearGradient colors={["#A1E3AF", "#65C393", "#29A276"]} style={Styles.cellphoneDialog}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Start')}>
                <AntDesign name="leftcircle" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
              <Text style={styles.bigTXT}> Tooth Wallet </Text>
              <View style={styles.underline}></View>
              <Text style={styles.subTitleTXT}> Tela de Login </Text>
            </View>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
              <KeyboardAvoidingView>
                <Formik
                  initialValues={formikValues}
                  validationSchema={formValidation}
                  onSubmit={() => { onSubmit(formikValues as never); }}
                >
                  {({ handleChange, values, errors }) => (
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
                        }
                        }
                        value={values.email}
                        left={<TextInput.Icon icon="email" />}
                        style={styles.loginINPUT}

                      />
                      <TextInput
                        label="Senha"
                        mode="outlined"
                        onChangeText={(text) => {
                          handleChange('password')(text);
                          setFormikValues({
                            ...formikValues,
                            password: text,
                          });
                        }}
                        value={values.password}
                        secureTextEntry={!showPassword}
                        left={<TextInput.Icon icon="lock" />}
                        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}
                        style={styles.loginINPUT}
                      />
                      {commonStates.error ? (
                        <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center", gap: 5 }}>
                          <TouchableOpacity style={styles.errorButton}>
                            {!commonStates.loading ? (
                              <Text style={styles.buttonText}>Dados Inválidos</Text>
                            ) : (
                              <ActivityIndicator size={20} color="#FFFFFF" />
                            )}
                          </TouchableOpacity>
                          <Text style={styles.infoText}>
                            Email ou senha incorretos
                          </Text>
                        </View>
                      ) : (
                        <View style={{ justifyContent: 'center', display: 'flex', alignItems: "center" }}>
                          <TouchableOpacity style={styles.beginButton} onPress={() => { onSubmit(values) }}>
                            {!commonStates.loading ? (
                              <View>
                                {!commonStates.success? (
                                <Text style={styles.buttonText}>Login</Text>
                                ) : (
                                  <Icon source="check-circle" size={20} color="#A1E3AF" />
                                )}
                              </View>
                            ) : (
                              <ActivityIndicator size={20} color="#FFFFFF" />
                            )}
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  )}
                </Formik>
              </KeyboardAvoidingView>
            </View>
            <View style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              <Image style={{ width: '100%', resizeMode: 'contain' }} source={require('../../../../assets/png/login_icon.png')} />
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
  loginVIEW: {
    // width: '70%',
    // height: '90%',
    ...getContainerStyles()
  },
  bigTXT: {
    fontSize: RFValue(30),
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  subTitleTXT: {
    fontSize: RFValue(25),
    marginTop: 10,
    fontWeight: '400',
    fontVariant: ['small-caps'],
    color: "#fff",
  },
  underline: {
    backgroundColor: '#fff',
    height: 2,
    width: '80%',
    marginTop: 1,
  },
  buttonText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
  },
  infoText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: "#FF7979",
  },
  loginINPUT: {
    // width: '250%',
    marginTop: 5,
    backgroundColor: "rgba(255, 255, 255, 0.72);"
  },
  beginButton: {
    backgroundColor: "#FFD52D",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 17,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '70%',
  },
  errorButton: {
    backgroundColor: "#FF7979",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 17,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '70%',
  }
})