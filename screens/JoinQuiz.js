import { StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import {  Input } from '@rneui/base'
import React,{ useState } from 'react'
import {auth,db} from '../firebase'


const JoinQuiz = ({navigation}) => {
    const [input,setInput]  = useState('')
    const [question,setQuestion]= useState([])
    const HandleJoinQuiz = ()=>{
        db.collection('quizs').where('idShare','==',input).onSnapshot((snapshot)=>
        setQuestion(
          snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
          }))
        ))
        if (question.length==1){
            navigation.replace('Quiz',{id:question[0].id})
        }
        else alert('ID không hợp lệ!')
        
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
    <StatusBar style='light'/>
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={90}>
        <Input
            placeholder='Enter Code Quiz'
            value={input}
            onChangeText={text=>setInput(text)}
        />
        <TouchableOpacity
            onPress={HandleJoinQuiz}
            style={{
                marginTop: 20, width: '100%', backgroundColor: '#3498db', padding: 20, borderRadius: 5,
            }}>
                <Text style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>Join</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
</SafeAreaView>
  )
}

export default JoinQuiz

const styles = StyleSheet.create({})