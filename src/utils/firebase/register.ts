import * as formik from 'formik'
import * as yup from 'yup'
import { auth, FireStoreDatabase } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { newUserModel } from '../../interfaces/Users'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setStates } from '../redux/appSlice'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Register({ navigation }) {
    const dispatch = useDispatch();
    const commonStates = useSelector((state: RootState) => state.commonState);

    const { Formik } = formik;

    const initialValues: newUserModel = {
        UUID: '',
        name: '',
        email: '',
        password: '',
        imageLink: ''
    };

    const formValidation = yup.object().shape({
        name: yup.string().required('Campo obrigatório').min(3, "Precisa ter no minimo 3 caracteres"),
        email: yup.string().required('Campo obrigatório').email("Email inválido"),

        password: yup
            .string()
            .required('Campo obrigatório')
            .min(6, "Precisa ter no minimo 6 caracteres"),
    });


    const [formikValues, setFormikValues] = useState(initialValues);
    const nextStepName = async (userData: newUserModel) => {
        const newName = userData.name;
        await AsyncStorage.setItem('temp_name', newName);
        // console.log('nome salvo: ', newName);
        navigation.navigate('NewAccount-2');
    }

    const nextStepPassword = async (userData: newUserModel) => {
        const newPassword = userData.password;
        await AsyncStorage.setItem('temp_password', newPassword);
        // console.log('senha salva: ', newPassword);
        navigation.navigate('NewAccount-3');
    }

    useEffect(() => {
        const getData = async () => {
            const StoredName = await AsyncStorage.getItem('temp_name');
            const StoredEmail = await AsyncStorage.getItem('temp_email');
            const StoredPassword = await AsyncStorage.getItem('temp_password');

            setFormikValues({
                ...initialValues,
                name: StoredName,
                email: StoredEmail,
                password: StoredPassword
            });
        }
        getData();
    }, [])

    const onSubmit = async (userData: newUserModel) => {

        const newEmail = userData.email;        
        await AsyncStorage.setItem('temp_email', newEmail);
        const StoredPassword = await AsyncStorage.getItem('temp_password');
        // console.log(formikValues.email, StoredPassword);

        try {
            dispatch(setStates({
                show: true,
                infoMSG: 'Cadastrando usuário...'
            }));

            await new Promise(resolve => setTimeout(resolve, 1500));

            navigation.navigate('NewAccount-4');

            const { user } = await createUserWithEmailAndPassword(auth, formikValues.email, StoredPassword);

            await new Promise(resolve => setTimeout(resolve, 1500));

            dispatch(setStates({
                show: true,
                infoMSG: 'Usuário cadastrado com sucesso!',
            }));

            const remaingData = {
                UUID: user?.uid,
                name: formikValues.name,
                email: formikValues.email,
                imageLink: '',
            };

            await setDoc(doc(FireStoreDatabase, `users/${user.uid}`), remaingData);

            await new Promise(resolve => setTimeout(resolve, 1500));

            await AsyncStorage.removeItem('temp_name');
            await AsyncStorage.removeItem('temp_email');
            await AsyncStorage.removeItem('temp_password');

            dispatch(setStates({
                show: true,
                infoMSG: 'Redirecionando para o login...'
            }));

            await new Promise(resolve => setTimeout(resolve, 2500));
            navigation.navigate('Login');

            dispatch(setStates({
                show: false
            }));


        } catch (error) {
            console.error("falha ao criar o usuário: ", error)
        }
    }

    return {
        show: commonStates.show,
        infoMSG: commonStates.infoMSG,
        Formik,
        initialValues,
        formValidation,
        formikValues,
        setFormikValues,
        onSubmit,
        nextStepName,
        nextStepPassword,
        // nextStepEmail,
    }

}