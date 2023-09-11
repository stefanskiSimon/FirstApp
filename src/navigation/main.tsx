import React, {FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Authstack from './authstack';
import Appstack from './appstack';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Main : FC = () =>{
    const [user, setUser] = useState<any>(null);
    const bootstrap =() =>{
        firebase.auth().onAuthStateChanged(_user => {
            if(_user){
                setUser(_user)
            }
        })
    }

    useEffect(() => {
        bootstrap()
    }, [])

    return(
        <NavigationContainer>
            {user !== null ? <Appstack/> : <Authstack/>}
        </NavigationContainer>
    )
}

export default Main;