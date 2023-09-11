import React, {FC, useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input , Button} from '../components';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';

interface Props{
    navigation:any;
}

const App: FC <Props> = (props) => {

    const [mail, setMail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const login = async ()=> {
        if(mail && password){
            const {user} = await firebase.auth().signInWithEmailAndPassword(mail,password)
        }
        else
        {
            Alert.alert('Missing fields')
        }
    }

    return(
        <View style = {styles.container}>
            <Text>Login</Text>
            <Input placeholder="E-mail" onChangeText={(text) => setMail(text)} />
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Button title='Login' onPress={login}/>

            <View style={styles.loginText}>
                <Text style={{marginHorizontal: 5}}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('sign')} style={{marginHorizontal: 5}}>
                    <Text style={{color:"#155"}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    loginText:
    {
        flexDirection:'row',
        marginVertical:20,
    }
})