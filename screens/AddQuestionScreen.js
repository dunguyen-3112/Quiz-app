import { StyleSheet, View ,KeyboardAvoidingView,StatusBar,TouchableOpacity} from 'react-native'
import React, { useLayoutEffect ,useState,useEffect} from 'react'
import { Input ,Button,Text} from '@rneui/base'
import { db,auth } from '../firebase'
import {Entypo } from '@expo/vector-icons'
import Answer from '../components/Answer'


const AddQuestionScreen = ({navigation}) => {

    const [question,setQuestion] = useState('')
    const [input,setInput] = useState('')
    const [answers,setAnswers] = useState([])
    const [correctAnswer,setCorrectAnswer] = useState('')

    const handleAdd = ()=>{
      if(input.length!==0){
        setAnswers([...answers,input])
        setInput('')
      }else{
        alert('Vui lòng nhập câu trả lời!')
      }
    }
    const createData = async()=>{
      if(correctAnswer.length !==0){
        await db.collection('users').doc(auth.currentUser.uid).collection('questions').add({
          question,
          answers,
          correctAnswer
        })
        .then(()=>{
          navigation.goBack()
        })
        .catch(error=>alert(error))
      }else{
        alert('Vui lòng nhấn để chọn đáp án.')
      }
    }
   
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Add new a Question'
        })
    },[navigation])
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light'/>
      <Text h3 style={{marginBottom:50}}>Create a question</Text>
      <View style={styles.inputContainer}>
          <Input 
            placeholder='Type Question' 
            autoFocus 
            type='text'
            value={question}
            onChangeText={text => setQuestion(text)}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd} style={{marginTop:10,marginBottom:10}}>
            <Entypo name="add-to-list" size={40} color="blue"  />
          </TouchableOpacity>
           <Input 
                placeholder='Type Answer' 
                type='text'
                value={input}
                onChangeText={text=>setInput(text)}
            />
            {
                answers.map((value,index)=>(
                    <Answer
                        onPress={()=>setCorrectAnswer(value)}
                        key={index}
                        text = {value}
                        onLongPress={()=>setAnswers([...answers.slice(0,index),...answers.slice(index+1,answers.length)])}
                    />
                ))

            }
            
      </View>
      <Button
        onPress={createData}
        title='Add'
        raised
        containerStyle={styles.button}
      />
    </KeyboardAvoidingView>
  )
}

export default AddQuestionScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:300,

    },
    button:{
        width:200,
        marginTop:10
    }
})