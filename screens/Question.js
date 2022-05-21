import { View, Text,SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'
import Answer from './Answer'

const Question = (props) => {
  return (
    <SafeAreaView style={{flex:1,width:300,marginStart:20}}>
      <Text style={style.question}>{props.text}</Text>
      <View>
          <Answer text='Answer 1'/>
          <Answer text='Answer 2'/>
          <Answer text='Answer 3'/>
          <Answer text='Answer 4'/>
      </View>
      
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    question:{
        padding:10,
        margin:15,
        borderRadius:15,
        borderWidth:2,
        borderColor:'#00FFFF',
        backgroundColor:'#FFF8DC',
        fontSize:20,
        marginStart:-15,
        fontWeight:"800",
    }
})

export default Question