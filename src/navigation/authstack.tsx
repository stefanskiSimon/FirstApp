import React, {FC} from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { Login, SignUp } from '../screens';

const {Navigator, Screen} = createStackNavigator();

const Authstack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='sign up' component={SignUp}/>
            <Screen name='Login' component={Login}/>
        </Navigator>
    )
}

export default Authstack;