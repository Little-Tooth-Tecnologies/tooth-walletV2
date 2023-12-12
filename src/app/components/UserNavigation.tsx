import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Avatar, Icon } from 'react-native-paper'
import { AuthContext } from '../../utils/firebase/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker'
import { FireStorage, FireStoreDatabase } from '../../utils/firebase/firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UserNavigation() {

    const [userName, setUserName] = React.useState('Usuário')
    const [userImgLink, setUserImgLink] = React.useState('' as string)
    const authContext = useContext(AuthContext)

    const navigation = useNavigation()

    useEffect(() => {
        if (authContext && authContext.user && authContext.user.uid) {            
            getDoc(doc(FireStoreDatabase, 'users', authContext?.user?.uid)).then((doc) => {
                if (doc.exists()) {
                    setUserName(doc.data().name)
                    setUserImgLink(doc.data().imageLink)                
                }
            }
            )
        }
    }, [authContext])

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
            const uid = authContext?.user?.uid;

            const storageRef = ref(FireStorage, `users/${uid}/profileImage`);

            const reponse = await fetch(result.assets[0].uri);
            const blob = await reponse.blob();

            await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });

            const imageURL = await getDownloadURL(storageRef);

            // setUserImgLink(imageURL);

            const userDocRef = doc(FireStoreDatabase, 'users', authContext?.user?.uid);
            await updateDoc(userDocRef, {
                imageLink: imageURL,
            });
        }
    }

    return (
        <View style={LocalStyles.navigationContainer}>
            <View style={LocalStyles.navigationIcons}>

                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={handleImageUploud}>
                        <Avatar.Image size={45} source={{ uri: userImgLink || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' }} />
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Olá, {userName || 'Carregando Usuário'} </Text>
                    <Text> Nenhuma Pendencia Hoje </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
                    <TouchableOpacity>
                        <Icon source="bell" color='#ADADAD' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Config' as never)}>
                        <Icon source="wrench" color='#ADADAD' size={25} />
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
        // justifyContent: 'center',
        // alignItems: 'center',
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
    navigationIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 30,
        alignItems: 'center',
    },
})