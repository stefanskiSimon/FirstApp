import React, {FC, useState} from 'react';
import { Input , Button} from '../components';
import 'firebase/firestore';
import firebase from 'firebase/compat';

import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props{
    navigation:any;
}

const App: FC <Props> = (props) => {

    const [name, setName] = useState<string | null>(null)
    const [mail, setMail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const signup = async () =>{
        if(name && mail && password)
        {
            try{
                const {user} = await firebase.auth().createUserWithEmailAndPassword(mail,password);
                if(user){
                    await firebase.firestore().collection("users").doc(user.uid).set({name,mail,password})
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else
        {
            Alert.alert('Error', 'Missing fields');
        }
    }
    return(
        <View style = {styles.container}>
            <Text>Sign up</Text>
            <Input placeholder="Name" onChangeText={(text) => setName(text)} />
            <Input placeholder="E-mail" onChangeText={(text) => setMail(text)} />
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Button title='Sign up' onPress={signup}/>
            <View style={styles.loginText}>
                <Text style={{marginHorizontal: 5}}>Have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={{marginHorizontal: 5}}>
                    <Text style={{color:"#155"}}>Login here</Text>
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