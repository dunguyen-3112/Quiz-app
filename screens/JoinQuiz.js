import { StyleSheet, Text,SafeAreaView,StatusBar,TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import {  Input } from '@rneui/base'
import React,{ useState ,useLayoutEffect} from 'react'
import {auth,db} from '../firebase'
import { useEffect } from 'react'


const JoinQuiz = ({navigation}) => {
    const [input,setInput]  = useState('')
    const [question,setQuestion]= useState([])
    const HandleJoinQuiz = async ()=>{
        if (question.length==1){
            navigation.replace('Quiz',{id:question[0].id})
        }
        else alert('ID không hợp lệ!')
       
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Tham gia bài đố'
        })
    },[navigation])

    useEffect(()=>{
        const unSubscribe = db.collection('quizs').where('idShare','==',input).onSnapshot((snapshot)=>
            setQuestion(
            snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
            }))
            ))
            return unSubscribe
    },[input])
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
    <StatusBar style='light'/>
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={90}>
        <Input
            placeholder='Gõ mã code bài Quiz'
            value={input}
            onChangeText={text=>setInput(text)}
        />
        <TouchableOpacity
            onPress={HandleJoinQuiz}
            style={{
                marginTop: 20, width: '100%', backgroundColor: '#3498db', padding: 20, borderRadius: 5,
            }}>
                <Text style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>Tham gia</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
</SafeAreaView>
  )
}

export default JoinQuiz

const styles = StyleSheet.create({})