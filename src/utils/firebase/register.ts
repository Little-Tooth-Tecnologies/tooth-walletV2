import * as formik from 'formik'
import * as yup from 'yup'
import { Fauth, FireStoreDatabase } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { newUserModel } from '../../interfaces/Users'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setStates } from '../redux/appSlice'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface RegisterProps {
    navigation: any
}

export function Register({ navigation }) {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const commonStates = useSelector((state: RootState) => state.commonState);

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

    const updateFormikState = (fieldName: string, value: string) => {
        setFormikValues(prevValues => ({
            ...prevValues,
            [fieldName]: value
        }));
    };


    const nextStepName = async (userData: newUserModel) => {
        await updateFormikState('name', userData.name);
        const updatedFormikValues = { ...formikValues, name: userData.name };
        navigation.navigate('NewAccount-2', updatedFormikValues);
    }

    const nextStepPassword = async (userData: newUserModel) => {
        try {
            await updateFormikState('password', userData.password);
            const updatedFormikValues = { ...formikValues, password: userData.password };
            console.log(updatedFormikValues)
        } catch (error) {
            console.error(error)
        }
        // navigation.navigate('NewAccount-3', initialValues);
    }

    const nextStepEmail = async (userData: newUserModel) => {
        // navigation.navigate('NewAccount-4', initialValues);
    }

    const onSubmit = async (userData: newUserModel) => {
        try {
            dispatch(setStates({
                show: true,
                infoMSG: 'Cadastrando usuário...'
            }));

            const { user } = await createUserWithEmailAndPassword(Fauth, userData.email, userData.password);

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

            dispatch(setStates({
                message: 'Redirecionando para o login...'
            }));

            await new Promise(resolve => setTimeout(resolve, 1000));

            dispatch(setStates({
                show: false
            }));

            await new Promise(resolve => setTimeout(resolve, 1500));

            navigation.navigate = ('Login');


        } catch (error) {
            console.error("falha ao criar o usuário: ", error)
        }
    }

    return {
        Formik,
        formikValues,
        initialValues,
        formValidation,
        onSubmit,
        show: commonStates.show,
        infoMSG: commonStates.infoMSG,
        nextStepName,
        nextStepPassword,
        nextStepEmail,
    }

}