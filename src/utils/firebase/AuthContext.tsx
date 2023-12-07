import React, { useEffect, useState, createContext } from "react";
import { auth } from "./firebase";
import { User } from "firebase/auth";
type AuthContextType = {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
            setLoading(false);
        })
    }, []);

    if (loading || !user) {
        console.log('verificando autenticação');        
        new Promise(resolve => setTimeout(resolve, 2500));
        console.log('Usuário não autenticado');
    } else {
        console.log('Usuário autenticado');        
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

