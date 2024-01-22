import * as formik from 'formik'
import * as yup from 'yup'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { UserModel } from '../../interfaces/Users';
import { useState } from 'react';
import { setStates } from '../redux/appSlice';
import { inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';



export function LoginUtils({ navigation }) {
    const dispatch = useDispatch();
    const commonStates = useSelector((state: RootState) => state.commonState);
    const nav = useNavigation();    

    const { Formik } = formik;

    const initialValues: UserModel = {
        email: '',
        password: '',
    }

    const formValidation = yup.object().shape({
        email: yup.string().required('Campo obrigatório').email("Email inválido"),
        password: yup
            .string()
            .required('Campo obrigatório')
            .min(6, "Precisa ter no minimo 6 caracteres"),
    });

    const [formikValues, setFormikValues] = useState(initialValues);

    const onSubmit = async (userData: UserModel) => {        
        try {
            const { email, password } = userData;

            dispatch(setStates({
                show: true,
                infoMSG: "Aguarde... estamos verificando seus dados",
                loading: true,
                error:false,                
            }))

            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            await setPersistence(auth, inMemoryPersistence);

            if (userCredentials.user.uid) {
                dispatch(setStates({
                    show: true,
                    infoMSG: "Login realizado com sucesso!",
                    error: false,
                    success: true 
                }))
                await new Promise(resolve => setTimeout(resolve, 1000));

                dispatch(setStates({
                    show: false,
                    infoMSG: "",
                    loading: false,
                }))                
                await new Promise(resolve => setTimeout(resolve, 1000));

                navigation.navigate('Home');
            } else {
                dispatch(setStates({
                    show: true,
                    infoMSG: "Falha ao realizar login!",
                    error: true,
                    loading: false
                }))                
                await new Promise(resolve => setTimeout(resolve, 1000));

                dispatch(setStates({
                    show: false,
                    infoMSG: "",
                    loading: false,
                    error: false
                }))                
            }
        }

        catch (error) {
            await new Promise(resolve => setTimeout(resolve, 2000));            
            dispatch(setStates({
                show: true,
                infoMSG: `Dados incorretos ou usuário não existe! : ${error}`,
                error: true,
                loading: false
            }))            
            await new Promise(resolve => setTimeout(resolve, 2000));            
                dispatch(setStates({
                    show: false,
                    infoMSG: "",
                    loading: false,
                    error: false
                }))            
        }
    }

    const doLogout = async () => {
        try {
            dispatch(setStates({
                show: true,
                infoMSG: "Aguarde... estamos deslogando você",
            }))

            setTimeout(async () => {
                await auth.signOut();
            }, 2500);

        } catch (error) {
            console.log(error);
            dispatch(setStates({
                show: true,
                infoMSG: "Falha ao deslogar",
            }))
        } finally {
            dispatch(setStates({
                show: true,
                infoMSG: "Deslogado com sucesso!",
            }))

            setTimeout(() => {
                nav.navigate('Start' as never);
            }, 2500);

        }
    }

    return {
        Formik,
        commonStates,
        initialValues,
        formValidation,
        formikValues,
        setFormikValues,
        onSubmit,
        doLogout,        
    }

}