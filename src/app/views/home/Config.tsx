import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar, Icon, Snackbar, Switch } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../../utils/firebase/AuthContext'
import { FireStoreDatabase } from '../../../utils/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { LoginUtils } from '../../../utils/firebase/login'
import { useSelector } from 'react-redux'
import { RootState } from '../../../utils/redux/store'

const Config = () => {

    const [userImgLink, setUserImgLink] = useState('' as string)
    const [notificacoes, setNotificacoes] = useState(false);
    const [modoNoturno, setModoNoturno] = useState(false);
    const commonStates = useSelector((state: RootState) => state.commonState); 
    const [atualizacoesAutomaticas, setAtualizacoesAutomaticas] = useState(false);
    const {doLogout} = LoginUtils({navigation: null})

    const authContext = useContext(AuthContext)
    const navigation = useNavigation()

    const onToggleNotificacoes = () => setNotificacoes(!notificacoes);
    const onToggleModoNoturno = () => setModoNoturno(!modoNoturno);
    const onToggleAtualizacoesAutomaticas = () => setAtualizacoesAutomaticas(!atualizacoesAutomaticas);

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
        <LinearGradient colors={["#B9FFCA", "#EAEAEA"]} style={LocalStyles.container}>
            <Snackbar visible={commonStates.show} onDismiss={() => commonStates.show}>{commonStates.infoMSG}</Snackbar>
            <View style={LocalStyles.navigationContainer}>
                <View style={LocalStyles.navigationIcons}>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                        <TouchableOpacity>
                            <Avatar.Image size={45} source={{ uri: userImgLink || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Configurações</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
                            <Icon source="home" color="#ADADAD" size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={LocalStyles.VerticalNavigationContainer}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text>Notificações Push</Text>
                    <Switch value={notificacoes} onValueChange={onToggleNotificacoes} />

                    <Text>Modo Noturno</Text>
                    <Switch value={modoNoturno} onValueChange={onToggleModoNoturno} />

                    <Text>Atualizações Automáticas</Text>
                    <Switch value={atualizacoesAutomaticas} onValueChange={onToggleAtualizacoesAutomaticas} />

                </View>

                <View>
                    <TouchableOpacity style={LocalStyles.logoutButton} onPress={doLogout}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>Deslogar</Text>
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
    navigationContainer: {
        marginTop: 60,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
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
    VerticalNavigationContainer: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        padding: 15,
        height: 500,
        justifyContent: 'flex-start',
        gap: 150,
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
    navigationIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 70,
        alignItems: 'center',
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