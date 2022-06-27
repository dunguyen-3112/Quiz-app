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
      if(answers.length >3){
        alert('Câu hỏi tối đa 4 câu trả lời!')
      }
    }
    const createData = async()=>{
      if(correctAnswer.length !==0 & input.trim()==''){
        await db.collection('questions').add({
          //collection('users').doc(auth.currentUser.uid).
          question,
          answers,
          correctAnswer,
          uid:auth.currentUser.uid
        })
        .then(()=>{
          navigation.goBack()
        })
        .catch(error=>alert(error))
      } 
      else{
        alert('Vui lòng nhập đủ thông tin và chọn đáp án.')
      }
    }
   
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Thêm câu hỏi'
        })
    },[navigation])
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light'/>
      <Text h3 style={{marginBottom:10}}>Tạo mới câu hỏi</Text>
      
      <View style={styles.inputContainer}>
      <Text h5 style={{marginBottom:50}}>(Nhấn giữ câu trả lời để xóa, nhấn câu trả lời đúng  để chọn đáp án.)</Text>
          <Input 
            placeholder='Gõ câu hỏi' 
            autoFocus 
            type='text'
            value={question}
            onChangeText={text => setQuestion(text)}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd} style={{marginTop:10,marginBottom:10}}>
            <Entypo name="add-to-list" size={40} color="blue"  />
          </TouchableOpacity>
           <Input 
                placeholder='Gõ câu trả lời' 
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
        title='Thêm'
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