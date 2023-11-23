import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../app/components/splash'
import Init from '../app/views/Init';
import Login from '../app/views/Login';
import NewAccount from '../app/views/NewAccount';

const stack = createNativeStackNavigator();

const AppRoutes = () => {

    return (
        <stack.Navigator
            initialRouteName="Start"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
        >

            <stack.Screen
                name="Splash"
                component={Splash}
            />

            <stack.Screen
                name="Start"
                component={Init}
            />

            <stack.Screen
                name="Login"
                component={Login}
            />

            <stack.Screen
                name="NewAccount"
                component={NewAccount}
            />

        </stack.Navigator>
    )
}

export default AppRoutes;