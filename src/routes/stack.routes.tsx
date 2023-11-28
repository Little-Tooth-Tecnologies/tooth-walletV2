import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../app/components/splash'
import Init from '../app/views/Init';
import Login from '../app/views/Login/Login';
import Name from '../app/views/newAccount/Account_Name';
import Password from '../app/views/newAccount/Account_Password';
import Birth from '../app/views/newAccount/Account_Email';
import Finish from '../app/views/newAccount/Account_Finish';

const stack = createNativeStackNavigator();

const AppRoutes = () => {

    return (
        <stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >

            {/* Telas Iniciais */}
            <stack.Screen
                name="Splash"
                component={Splash}
            />

            <stack.Screen
                name="Start"
                component={Init}
            />

            {/* Login */}
            <stack.Screen
                name="Login"
                component={Login}
            />

            {/* Cadastro */}
            <stack.Screen
                name="NewAccount-1"
                component={Name}
            />

            <stack.Screen
                name="NewAccount-2"
                component={Password}
            />

            <stack.Screen
                name="NewAccount-3"
                component={Birth}
            />

            <stack.Screen
                name="NewAccount-4"
                component={Finish}
            />

        </stack.Navigator>
    )
}

export default AppRoutes;