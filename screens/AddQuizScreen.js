import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from '@rneui/base'
import {auth,db} from '../firebase'
import { ListItem } from '@rneui/themed'
import uuid from 'react-native-uuid';

const AddQuizScreen = ({navigation}) => {

    const [input,setInput] = useState("")
    const [questions,setQuestions] = useState([])
    const [selectQuestions,setSelectQuestions] = useState([])
    const [isDisabled,setIsDisabled] = useState(true)

    const HandleAddQuiz = ()=>{
    
        db.collection('quizs').add({
            questions:selectQuestions,
            name:input,
            uid:auth.currentUser.uid,
            idShare:uuid.v4()

        })
        .then(()=>navigation.goBack())
        .catch(error=>alert(error))
        
    }

    const handleQuestion = (index,{id})=>{
        let arr = [...questions]
        arr.splice(index, 1);
        setQuestions(arr)
        setSelectQuestions([...selectQuestions,{id}])
    }
    useEffect(()=>{
        if (selectQuestions.length>0) setIsDisabled(false)
        else setIsDisabled(true)
      },[selectQuestions])

    useEffect(()=>{
        const unSubscribe = db.collection('questions').where('uid','==',auth.currentUser.uid).onSnapshot((snapshot)=>
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
            <TouchableOpacity
                onPress={HandleAddQuiz}
                disabled = {isDisabled}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: '#3498db', padding: 20, borderRadius: 5,
                }}>
                    <Text style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>Add</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddQuizScreen

const styles = StyleSheet.create({
    
})