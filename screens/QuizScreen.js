import { StyleSheet, View,ScrollView, SafeAreaView, StatusBar ,TouchableOpacity,Text,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db,auth } from '../firebase'
import * as firebase from 'firebase'
import Question from '../components/Question'

const QuizScreen = ({navigation,route}) => {

    const [questions,setQuestions] = useState([])
    const [isDisabled,setIsDisabled] = useState(true)
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0)
    const [correctAnswerIndex,setCorrectAnswerIndex] = useState(0)

    const handleNext = ()=>{
      if(currentQuestionIndex<questions.length-1)
        setCurrentQuestionIndex(currentQuestionIndex+1)
        setIsDisabled(true)
      if(currentQuestionIndex+1===questions.length){
        alert('Bạn làm đúng '+correctAnswerIndex+' câu.')
        db.collection('quizs').doc(route.params.id).collection('result').add({
          uid:auth.currentUser.uid,
          correctAnswerIndex
      })
      .then(()=>navigation.goBack()).catch(error=>alert(error))
      .catch(error=>alert(error))
        navigation.replace("Home")
      }
    }
    const handleNextDisabled = ()=>{
        setIsDisabled(false)
    
    }

    const handlecorrectAnswer = ()=>{
      setCorrectAnswerIndex(correctAnswerIndex+1)
    }
    useEffect(()=>{
      const unSubscribe = db.collection('quizs').doc(route.params.id).onSnapshot((snapshot)=> 
      //collection('users').doc(auth.currentUser.uid).
      setQuestions(
          snapshot.data().questions.map(doc=>(({
            data:doc.id
          } )))
        )
      
      )
      return unSubscribe
    },[currentQuestionIndex])
  return (
    <SafeAreaView style={{
      flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               backgroundColor: '#252C4A',
               position:'relative'
    }}>
      <StatusBar styles='light'/>
      {questions[currentQuestionIndex]?<View>
        <Text style={{fontSize:30,color:'#00BFFF',fontWeight:'800',padding:10}}>{currentQuestionIndex+1}/{questions.length}</Text>
       <Question data={questions[currentQuestionIndex].data} handleDisable={handleNextDisabled} handlecorrectAnswer = {handlecorrectAnswer}/>
      </View>
        :<Text>Đang tải dữ liệu!</Text>}
       <View style={{flexDirection:'row' ,justifyContent:'space-between',marginHorizontal:40,marginVertical:40}}>
       <TouchableOpacity
                onPress={handleNext}
                disabled = {isDisabled}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: '#3498db', padding: 20, borderRadius: 5,
                }}>
                    <Text style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>{currentQuestionIndex+1===questions.length?'Send':'Next'}</Text>
                </TouchableOpacity>
       </View>
       <Image
                source={require('../assets/image/DottedBG.png')}
                style={{
                    width: 300,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
                />

    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  button:{
    borderColor:'#ccc'
  }
})