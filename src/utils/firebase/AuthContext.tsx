import React, { useEffect, useState, createContext } from "react";
import { Fauth } from "./firebase";

type AuthContextType = { 
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState<User | null>(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Fauth.onAuthStateChanged((authUser) => {
            setUser(authUser);
            setLoading(false);            
        })
    }, []);

    if (loading || !user) {
        console.log("verificando autenticação")
        new Promise(resolve => setTimeout(resolve, 5000));
        console.log("usuário não autenticado")
    } else { 
        console.log("usuário autenticado")
    }

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

