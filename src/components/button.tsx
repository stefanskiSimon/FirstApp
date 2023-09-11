import React, {FC} from 'react';
import {TouchableOpacity } from 'react-native-gesture-handler';
import {Dimensions, StyleSheet, Text} from 'react-native';

const {height, width} = Dimensions.get('screen');

interface Props{
    title:string;
    onPress: () => void;

}

const App: FC <Props> = (props) =>{
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        padding:10,
        paddingHorizontal:20,
        borderRadius: 8,
        marginVertical:10,
        margin:10
        //width: width / 2.0
    },
    text:{
        color:'#fff',
    }
})