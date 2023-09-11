import React, {FC, useEffect, useState} from 'react';
import { Button, Input, PostRender } from '../components';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Props{
    navigation: any;
}

const App: FC <Props> = (props) => {

const [msg, setMsg] = useState<string | null>(null);
const [user, setUser] = useState<any>(null);
const [posts, setPosts] = useState<any>(null);
const [value, setValue] = useState<string>("");

const signout = () =>{
    firebase.auth().signOut();
}

const setm = (text:string) =>{
    setMsg(text)
    setValue("")

}

const fetchCurrentUser = async () =>{
    const uid = firebase.auth().currentUser?.uid;
    const user = await firebase.firestore().collection('users').doc(uid).get();
    setUser({id: user.id, ...user.data()})
}

const fetchPosts = async () =>{
    /*const posts = await firebase.firestore().collection('posts').where('approved', '==', true).get();
    setPosts([...posts.docs])*/
    firebase.firestore().collection('posts').where('approved' , '==', true).onSnapshot(QuerySnapshot => {
        const documents = QuerySnapshot.docs;
        setPosts(documents)
    })
}

useEffect(()=>{
    fetchCurrentUser();
    fetchPosts();
}, [])

const post = async () => {
    if(msg){
        const data = {
            msg,
            timeStamp: Date.now(),
            approved: false
        }
    try{
        await firebase.firestore().collection('posts').add(data);
    }
    catch(err){
        console.log(err)
    }
        
    }
    else{
        Alert.alert('Missing fields')
    }
}

    return(
        <View style = {styles.container}>
            <View style={{flex:1, marginTop:10}}>
                {posts?.length > 0 ? (
                    <FlatList data={posts} 
                    renderItem={({item}) => <PostRender 
                    msg={item.data().msg} 
                    timeStamp={item.data().timeStamp} 
                    approved={item.data().approved}/>}/>
                ) : (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text>Nothing to display</Text>
                        </View>
                )}
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.text}>Home</Text>
                <Button title='Sign out' onPress={signout}/>
                <Input placeholder='Write something here...' onChangeText={text => {setm(text), setValue(text)}} value={value}/>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Button title='Post' onPress={post} />
                    </View>
                    {user ? user.isAdmin ? (
                        <View>
                            <Button title='Dashboard' onPress={() => props.navigation.navigate('Dashboard')}/>
                        </View>
                    ) : null : null}
                </View>
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
    text:{
        fontSize:20,
        justifyContent:'center',
        alignSelf:'center'
    }
})