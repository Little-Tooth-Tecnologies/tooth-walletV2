import React, { useEffect, useState, createContext } from "react";
import { auth } from "./firebase";
import { User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
type AuthContextType = {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props) => {
    const { children } = props;

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authCompleted, setAuthCompleted] = useState(false);
    const authMSG = 'Verificando Autenticação'

    useEffect(() => {
        const verification = auth.onAuthStateChanged(async (authUser) => {
            try {
                setLoading(true);
                if (authUser) {
                    // console.log("usuário autenticado: ", authUser);
                    setUser(authUser);
                } else {
                    console.log("usuário não autenticado");
                    setUser(null);
                }

            } catch (error) {
                console.log("Falha na verificação de autenticação: ", error);
            }
            finally {
                setLoading(false);
                setAuthCompleted(true);
            }
        })
        return () => verification();
    }, []);

    // if (loading || !authCompleted) {
    //     return <ActivityIndicator animating={true} color='#D9D9D9' size={50} style={{ marginTop: 30 }} />
    // }


    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

