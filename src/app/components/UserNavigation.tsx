import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Avatar, Icon } from 'react-native-paper'
import { AuthContext } from '../../utils/firebase/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker'
import { FireStorage, FireStoreDatabase } from '../../utils/firebase/firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UserNavigation() {

    const [userName, setUserName] = React.useState('')
    const [userImgLink, setUserImgLink] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const authContext = useContext(AuthContext)


    const navigation = useNavigation()

    const handleImageUploud = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissões de câmera para fazer isso funcionar!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setIsLoading(true)
            const uid = authContext?.user?.uid;
            const storageRef = ref(FireStorage, `users/${uid}/profileImage`);
            const reponse = await fetch(result.assets[0].uri);
            const blob = await reponse.blob();
            await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
            const imageURL = await getDownloadURL(storageRef);
            await AsyncStorage.setItem("userIMG", imageURL)                                    
            const userDocRef = doc(FireStoreDatabase, 'users', authContext?.user?.uid);
            await updateDoc(userDocRef, {
                imageLink: imageURL,
            });            
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }

    useEffect(() => {
        if (authContext && authContext.user && authContext.user.uid) {
            setIsLoading(true)
            getDoc(doc(FireStoreDatabase, 'users', authContext?.user?.uid)).then((doc) => {
                if (doc.exists()) {
                    setUserName(doc.data().name)
                    setUserImgLink(doc.data().imageLink)
                }
            }
            )            
            setIsLoading(false)
        }
    }, [authContext])
    

    return (
        <View style={LocalStyles.navigationContainer}>
            <View style={LocalStyles.navigationIcons}>

                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={handleImageUploud}>
                        {isLoading ? (
                            <ActivityIndicator animating={true} size={45} color="#000" />
                        ) : (
                            <Avatar.Image size={45} source={{ uri: userImgLink || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' }} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Olá, {userName || 'Carregando Usuário'} </Text>
                    <Text> Nenhuma Pendencia Hoje </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
                    <TouchableOpacity>
                        <Icon source="bell" color='#ADADAD' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Config' as never)}>
                        <Icon source="wrench" color='#ADADAD' size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const LocalStyles = StyleSheet.create({
    navigationContainer: {
        marginTop: 60,
        flexDirection: 'row',
        marginLeft: '7%',
        marginRight: '7%',
        padding: 20,
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
        justifyContent: 'space-evenly',
        gap: 30,
        alignItems: 'center',
    },
})