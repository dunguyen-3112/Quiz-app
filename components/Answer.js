import { StyleSheet,View, Text,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

// const [answer,setAnswer] = useState(0);

const Answer = (props) => {
  return (
    <View>
        <TouchableOpacity activeOpacity={0.5}>
            <Text style={style.answer}> {props.text}</Text>
        </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    answer:{
        padding:10,
        margin:15,
        borderRadius:15,
        borderWidth:2,
        borderColor:'#7FFF00',
        backgroundColor:'#F8F8FF',
        fontSize:16,
        fontWeight:"300"

    }
})

export default Answer