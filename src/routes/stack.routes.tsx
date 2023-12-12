import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../app/components/splash'
import Init from '../app/views/Init';
import Login from '../app/views/Login/Login';
import Name from '../app/views/newAccount/Account_Name';
import Password from '../app/views/newAccount/Account_Password';
import Birth from '../app/views/newAccount/Account_Email';
import Finish from '../app/views/newAccount/Account_Finish';
import Home from '../app/views/home/Home';
import Config from '../app/views/home/Config';
import Add_Balance from '../app/views/Balance/Add_Balance';
import Add_Spend from '../app/views/Spend/Add_Spend';

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

            {/* Home */}
            <stack.Screen
                name="Home"
                component={Home}
            />

            <stack.Screen
                name='Config'
                component={Config}
            />

            <stack.Screen
                name='add_balance'
                component={Add_Balance}
            />

            <stack.Screen
                name='add_spend'
                component={Add_Spend}
            />

        </stack.Navigator>
    )
}

export default AppRoutes;