import { StyleSheet, View,ScrollView, SafeAreaView, StatusBar ,TouchableOpacity,Text,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db,auth } from '../firebase'
import {ListItem} from '@rneui/themed'
import Answer from '../components/Answer'
import Question from '../components/Question'

const QuizScreen = ({navigation,route}) => {

    const [questions,setQuestions] = useState([])
    const [isDisabled,setIsDisabled] = useState(true)
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0)

    const handleNext = ()=>{
      if(currentQuestionIndex<questions.length-1)
        setCurrentQuestionIndex(currentQuestionIndex+1)
        setIsDisabled(true)


    }
    const handleNextDisabled = ()=>{
        setIsDisabled(false)
    
    }
    useEffect(()=>{
      const unSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('quizs').doc(route.params.id).onSnapshot((snapshot)=> 
      setQuestions(
          snapshot.data().questions.map(doc=>(({
            data:doc
          } )))
        )
      
      )
      return unSubscribe
    },[])
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
       <Question data={questions[currentQuestionIndex].data} handleDisable={handleNextDisabled}/>
      </View>
        :<Text>Đang tải dữ liệu!</Text>}
       <View style={{flexDirection:'row' ,justifyContent:'space-between',marginHorizontal:40,marginVertical:40}}>
       <TouchableOpacity
                onPress={handleNext}
                disabled = {isDisabled}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: '#3498db', padding: 20, borderRadius: 5,
                }}>
                    <Text style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>Next</Text>
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