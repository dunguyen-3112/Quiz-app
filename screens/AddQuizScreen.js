import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from '@rneui/base'
import * as firebase from 'firebase'
import {auth,db} from '../firebase'
import { ListItem } from '@rneui/themed'

const AddQuizScreen = ({navigation}) => {

    const [input,setInput] = useState("")
    const [input2,setInput2] = useState("")
    const [questions,setQuestions] = useState([])
    const [selectQuestions,setSelectQuestions] = useState([])

    const HandleAddQuiz = ()=>{
    
        db.collection('quizs').add({
            questions:selectQuestions,
            name:input,
            description: input2,
            uid:auth.currentUser.uid
            //collection('users').doc(auth.currentUser.uid)

        })
        .then(()=>navigation.goBack())
        .catch(error=>alert(error))
        
    }

    const handleQuestion = (index,{id})=>{
        let arr = [...questions]
        arr.splice(index, 1);
        setQuestions(arr)
        setSelectQuestions([...selectQuestions,{id}])
        console.log(selectQuestions)
    }

    useEffect(()=>{
        const unSubscribe = db.collection('questions').where('uid','==',auth.currentUser.uid).onSnapshot((snapshot)=>
        //.collection('users').doc(auth.currentUser.uid)
        setQuestions(
          snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
          }))
        )
        )
        return unSubscribe
      },[])
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <StatusBar style='light'/>
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={90}>
            <Input
                placeholder='Enter Name Quiz'
                value={input}
                onChangeText={text=>setInput(text)}
            />
            <Input
                placeholder='Enter Description'
                value={input2}
                onChangeText={text=>setInput2(text)}
            />
            <ScrollView>
                {
                    questions.map(({id,data},index)=>(
                        <ListItem bottomDivider key={id} onPress={()=>handleQuestion(index,{id,data})}>
                            <ListItem.Content >
                                <ListItem.Title style={{fontWeight:'800'}}>
                                    <Text>{data.question}</Text>
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
            <Button
                title='Add'
                onPress={HandleAddQuiz}
            />
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddQuizScreen

const styles = StyleSheet.create({})