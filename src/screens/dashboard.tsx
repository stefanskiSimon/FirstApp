import React, {FC, useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';

import { ApprovalRender, Button } from '../components';
import { FlatList } from 'react-native-gesture-handler';

interface Props{
    navigation: any;
}

const App: FC <Props>= (props) => {

const [posts, setPosts] = useState<any>(null);

const fetchRenderPost = async () =>{
    firebase.firestore().collection('posts').where('approved' , '==', false).onSnapshot(QuerySnapshot => {
        const documents = QuerySnapshot.docs;
        setPosts(documents)
    })
}

const onApprove = async (id: string) => {
    const post = await firebase.firestore().collection('posts').doc(id).get();
    post.ref.set({approved: true}, {merge: true});
}
const onReject = async (id: string) => {
    await firebase.firestore().collection('posts').doc(id).delete();
}

useEffect(() => {
    fetchRenderPost();
}, [])

    return(
        <View style = {styles.container}>
            <Button title='Back' onPress={() => props.navigation.navigate('Home')}/>
            <Text>Dashboard</Text>
            <View style={{height: '50%'}}>
            <FlatList data={posts} 
            renderItem={({item}) => <ApprovalRender msg={item.data().msg} 
            timeStamp={item.data().timeStamp} 
            approved={item.data().approved} 
            onApprove={() => onApprove(item.id)} 
            onReject={() => onReject(item.id)}/>}/>
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
    }
})