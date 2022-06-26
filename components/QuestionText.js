import { View, Text,SafeAreaView,StyleSheet ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {db,auth} from '../firebase'

const QuestionText = (props) => {

  const [question,setQuestion] = useState(null)
 
  useEffect(()=>{
     const unSubscribe = db.collection('questions')
                          .doc(props.data)
                          .onSnapshot((snapshot)=>
                          setQuestion(snapshot.data())
                          )
      return unSubscribe
    },[props.data])

  const handleLongPress = ()=>{
    db.collection('quizs').doc(props.quizId).collection('questions').where('id','==',props.data).delete()
    .then(()=>{
      alert("Xoa thanh cong")
    })
    .catch(err=>{
      alert(err.message)
    })
  }

 

 

  return (
    <SafeAreaView style={{width:'100%'}}>
      {
        question?
        <View style={{backgroundColor:'#7FFFD4',borderBottomLeftRadius:20,marginBottom:5,marginTop:5,marginStart:10,marginEnd:10,borderTopRightRadius:20}}>
          <TouchableOpacity onLongPress={handleLongPress}><View><Text style={style.question}>{question.question}</Text></View></TouchableOpacity>
        </View>
        :<Text>Đang tải dữ liệu!</Text>
       
      }
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  question:{
    color: '#2F4F4F',
    fontSize: 30
  },
  
})

export default QuestionText