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
            }))

            const userCredentials = await signInWithEmailAndPassword(auth, email, password);            

            await setPersistence(auth, inMemoryPersistence);

            if (userCredentials.user.uid) {
                dispatch(setStates({
                    show: true,
                    infoMSG: "Login realizado com sucesso!",
                }))  
                setTimeout(() => {
                    
                    dispatch(setStates({
                        show: false,
                        infoMSG: ""
                    })) 

                    navigation.navigate('Home');
                }, 2500)

            } else {
                dispatch(setStates({
                    show: true,
                    infoMSG: "Falha ao realizar login!",
                }))
            }
        }

        catch (error) {
            dispatch(setStates({
                show: true,
                infoMSG: `Dados incorretos ou usuário não existe! : ${error}`,
            }))

            setTimeout(() => {
                dispatch(setStates({
                    show: false,
                    infoMSG: "",
                }))
            }, 10000);
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
        initialValues,
        formValidation,
        formikValues,
        setFormikValues,
        onSubmit,
        doLogout
    }

}