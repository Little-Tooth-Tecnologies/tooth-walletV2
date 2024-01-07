import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../utils/firebase/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { FireStoreDatabase } from '../../utils/firebase/firebase'

interface SimpleNavigation_Props {
    title: string
}

const SimpleNavigation = ({...props} : SimpleNavigation_Props) => {
    const [userImgLink, setUserImgLink] = useState('' as string)
    const navigation = useNavigation()
    const authContext = useContext(AuthContext)

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
        <View style={LocalStyles.navigationContainer}>
            <View style={LocalStyles.navigationIcons}>
                <View>
                    <TouchableOpacity>
                        <Avatar.Image size={45} source={{ uri: userImgLink || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{props.title}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
                        <Icon source="home" color="#ADADAD" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const LocalStyles = StyleSheet.create({
    navigationContainer: {
        marginTop: 60,
        justifyContent: 'space-evenly',
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
        gap: 50,
        alignItems: 'center',
    },
})

export default SimpleNavigation