import { View, Text,SafeAreaView,StyleSheet ,TouchableOpacity,Alert} from 'react-native'
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

    const showConfirmDialog = () => {
      return Alert.alert(
        "Questions",
        "Bạn có chắc chắn muốn loại câu hỏi này không ?",
        [
          // The "Yes" button
          {
            text: "Có",
            onPress: () => {
              deleteQ()
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "Không",
          },
        ]
      )
    }

    const deleteQ = async ()=>{
     await db.collection('quizs').doc(props.quizId).onSnapshot((snapshot)=>{
      let value = []
      let value1 = snapshot.data()
      snapshot.data().questions.map((item)=>{
        if (item.id != props.data) value.push(item)
      })
      value1.questions = value
      db.collection('quizs').doc(props.quizId).set(value1)
     })
    }

  const handleLongPress = ()=>{
    showConfirmDialog()
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
    fontSize: 20
  },
  
})

export default QuestionText