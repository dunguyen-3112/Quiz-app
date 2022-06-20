import { StyleSheet,View, Text,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'

const Answer = (props) => {
  const [isDisable,setIsDisabled] = useState(false)
  const handlePress = ()=>{

    props.onPress(props.text)
  }
  const handleLongPress =()=>{
    props.onLongPress()
  }


  const style = StyleSheet.create({

    answer:{
      fontSize:20,
      borderWidth: 3, 
      borderColor: props.currentOptionSelected != '' & props.text==props.correctOption 
      ? '#00C851' //xanh lá
      : props.text==props.currentOptionSelected 
      ? '#ff4444' //đỏ
      : '#1E90FF'+'40',
      backgroundColor: props.currentOptionSelected != '' & props.text==props.correctOption 
      ? '#00C851' +'20'
      : props.text==props.currentOptionSelected 
      ? '#ff4444' +'20'
      : '#1E90FF'+'20',
      height: 60,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical:10,
      textAlignVertical:'center',
      textAlign:'center'
    }})
  return (
    <View>
  
        <TouchableOpacity activeOpacity={0.5} onPress={handlePress} onLongPress={handleLongPress} disabled={isDisable}>
            <Text style={style.answer}> {props.text}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Answer