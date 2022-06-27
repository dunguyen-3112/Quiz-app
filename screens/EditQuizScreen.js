import { StyleSheet, Text, View ,TouchableOpacity,SafeAreaView,ScrollView,StatusBar} from 'react-native'
import React from 'react'
import { useEffect,useLayoutEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase';
import {  Input } from '@rneui/base'
import QuestionText from '../components/QuestionText';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditQuizScreen = ({route,navigation}) => {
    const [quizs,setQuizs] = useState([])
    const [input,setInput] = useState('')
  

    useLayoutEffect(()=>{
      navigation.setOptions({
          title:'Cập nhật bài đố'
      })
  },[navigation])
    useEffect(()=>{
        const unSubscribe =  db.collection('quizs').doc(route.params.id).onSnapshot((snapshot)=> 
       { 
        setInput(snapshot.data().name)
        setQuizs(
            snapshot.data().questions.map(doc=>(({
              data:doc.id,
            } )))
          )}
      )
      return unSubscribe
    },[route.params.id])

  
  return (
    <SafeAreaView style={{flex:1,position:'relative',backgroundColor:'white'}}>
      <StatusBar style='light'/>
     <ScrollView style={{marginHorizontal: 20,}}>
        <Input onChangeText={(text)=>setInput(text)} value={input}/>
        {quizs.length>0?(<View>
          {
            quizs.map((item,index)=>{
                return (
                    <QuestionText data={item.data} key={index} quizId={route.params.id} handleDisable={()=>{}} handlecorrectAnswer = {()=>{}}/>
                  )
              })
          }
      </View>):(<Text>{route.params.id}</Text>)}
      <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuestion')} style={{marginStart:'auto',marginEnd:30,marginBottom:30}}>
        <Icon name="add" size={50} color="#FFFFFF" style={{width:50,height:50,borderRadius:25,backgroundColor:'blue'}}/>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditQuizScreen

const styles = StyleSheet.create({})