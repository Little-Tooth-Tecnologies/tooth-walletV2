import { View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar, Icon, Snackbar, Switch, Text } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../../utils/firebase/AuthContext'
import { FireStoreDatabase } from '../../../utils/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { LoginUtils } from '../../../utils/firebase/login'
import { useSelector } from 'react-redux'
import { RootState } from '../../../utils/redux/store'
import { Divider } from '@rneui/themed';
import SimpleNavigation from '../../components/SimpleNavigation'
import { bgPattern, gradientColors, inverseGradient } from '../../../styles/Styles'


const Config = () => {

    const [userImgLink, setUserImgLink] = useState('' as string)
    const [notificacoes, setNotificacoes] = useState(false);
    const [modoNoturno, setModoNoturno] = useState(false);
    const appVersion = '1.0.0'
    const commonStates = useSelector((state: RootState) => state.commonState);
    const { doLogout } = LoginUtils({ navigation: null })

    const authContext = useContext(AuthContext)
    const navigation = useNavigation()

    const onToggleNotificacoes = () => setNotificacoes(!notificacoes);
    const onToggleModoNoturno = () => setModoNoturno(!modoNoturno);

    useEffect(() => {
        if (authContext?.user?.uid && authContext?.user?.uid) {
            getDoc(doc(FireStoreDatabase, 'users', authContext?.user?.uid)).then((doc) => {
                if (doc.exists()) {
                    setUserImgLink(doc.data().imageLink)
                }
            }
            )
        }
    }, [])

    return (
        <LinearGradient colors={inverseGradient} style={LocalStyles.container}>
            <ImageBackground source={bgPattern} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} imageStyle={{ opacity: 0.2, resizeMode: 'cover' }}>
                <ScrollView>
                    <SimpleNavigation title='Configurações' />
                    <View style={LocalStyles.VerticalNavigationContainer}>
                        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                            <Text variant='headlineSmall' style={{ color: '#2E7D32' }}>Tooth Wallet</Text>
                            <Divider width={2} color={'#ADADAD'} />
                            <Text variant='bodySmall'>Seu aplicativo de gestão financeira</Text>
                        </View>


                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <View style={LocalStyles.switchesAlign}>
                                <Switch value={notificacoes} onValueChange={onToggleNotificacoes} color='#2E7D32' />
                                <Text>Notificações Push</Text>
                            </View>
                            <View style={LocalStyles.switchesAlign}>
                                <Switch value={modoNoturno} onValueChange={onToggleModoNoturno} color='#2E7D32' />
                                <Text>Modo Noturno</Text>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity>
                                <Text style={{ color: '#2E7D32' }}> Termos de Uso do Tooth Wallet</Text>
                                <Divider width={2} color={'#2E7D32'} />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={LocalStyles.logoutButton} onPress={doLogout}>
                                <Text style={{ color: '#fff', fontSize: 15, alignItems: 'center' }}>
                                    Deslogar <Icon source='exit-to-app' color="#FFFFFF" size={17} />
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text> Versão do APP : {appVersion} </Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity>
                            <Image style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: '5%' }} source={require('../../../../assets/favicon.png')} />
                        </TouchableOpacity>
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
    VerticalNavigationContainer: {
        marginTop: 60,
        marginLeft: '7%',
        marginRight: '7%',
        marginBottom: '10%',
        padding: 15,
        height: 400,
        justifyContent: 'space-around',
        alignItems: 'center',
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
    switchesAlign: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        backgroundColor: '#C53232',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 5,
    }
})

export default Config