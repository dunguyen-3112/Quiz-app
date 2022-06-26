import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase';
import QuestionText from '../components/QuestionText';

const EditQuizScreen = ({route}) => {
    const [quizs,setQuizs] = useState([])

    useEffect(()=>{
        const unSubscribe =  db.collection('quizs').doc(route.params.id).onSnapshot((snapshot)=> 
       { 
        setQuizs(
            snapshot.data().questions.map(doc=>(({
              data:doc.id
            } )))
          )}
      )
      return unSubscribe
    },[route.params.id])
  return (
    <View>
        {quizs.length>0?(<View>
          {
            quizs.map((item,index)=>{
                return (
                    <QuestionText data={item.data} quizId={route.params.id} handleDisable={()=>{}} handlecorrectAnswer = {()=>{}}/>
                  )
              })
          }
      </View>):(<Text>{route.params.id}</Text>)}
     
    </View>
  )
}

export default EditQuizScreen

const styles = StyleSheet.create({})