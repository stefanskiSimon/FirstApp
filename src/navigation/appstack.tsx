import React, {FC} from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { HomePage, DashBoard } from '../screens';

const {Navigator, Screen} = createStackNavigator();

const appstack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown:false}}>
            <Screen name='Home' component={HomePage}/>
            <Screen name='Dashboard' component={DashBoard}/>
        </Navigator>
    )
}

export default appstack;