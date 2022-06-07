import { View, Text,SafeAreaView,StyleSheet ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Answer from './Answer'
import {db,auth} from '../firebase'

const Question = (props) => {

  const [question,setQuestion] = useState(null)
  const [text,setText] = useState('')
  const [currentOptionSelected,setCurrentOptionSelected] = useState('')
  useEffect(()=>{
    setCurrentOptionSelected('')
     const unSubscribe = db.collection('users')
                          .doc(auth.currentUser.uid)
                          .collection('questions')
                          .doc(props.data.id)
                          .onSnapshot((snapshot)=>
                          setQuestion(snapshot.data())
                          )
      return unSubscribe
    },[props.data.id])

  const handlePress = (value)=>{
    setCurrentOptionSelected(value)
    props.handleDisable()
  }

 

  return (
    <SafeAreaView style={{marginStart:10,width:350}}>
      {
        question?
        <View>
          <Text style={style.question}>{question.question}</Text>
      <View>
          {
            
            question.answers.map((item,index)=>{
                return (
                 
                       <Answer text={item} correctOption={question.correctAnswer} currentOptionSelected={currentOptionSelected} onPress={handlePress} key={index} />
                      
                  )
              })
          }
      </View>
        </View>
        :<Text>Đang tải dữ liệu!</Text>
       
      }
      
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  question:{
    color: '#FFFFFF',
    fontSize: 30
  },
  
})

export default Question