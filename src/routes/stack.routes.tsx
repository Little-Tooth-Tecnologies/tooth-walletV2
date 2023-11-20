import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../app/components/splash'
import Init from '../app/views/Init';

const stack = createNativeStackNavigator();

const AppRoutes = () => {

    return(
        <stack.Navigator
        initialRouteName="Splash"
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

        </stack.Navigator>
    )
}

export default AppRoutes;