import React, {FC} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import {View, Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');

interface Props {
    placeholder:string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    value:any
}

const Input: FC<Props> = (props) => {
    return(
        <View style = {styles.container}>
            <TextInput style={styles.input} placeholder={props.placeholder} value = {props.value} secureTextEntry={props.secureTextEntry || false} onChangeText={props.onChangeText} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container:{
        width: width / 1.1,
        alignself: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginVertical: 10,
    },
    input:{
        padding: 15
    }
})