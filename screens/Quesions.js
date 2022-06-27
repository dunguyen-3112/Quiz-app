import { StyleSheet, Text, View,SafeAreaView,StatusBar,TouchableOpacity,ScrollView } from 'react-native'
import React, { useState,useEffect ,useLayoutEffect} from 'react'
import CustomListQuestionItem from '../components/CustomListQuestionItem'
//import Icon from 'react-native-vector-icons/FontAwesome';
import {db,auth} from '../firebase'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Quesions = ({navigation}) => {
    const [questions,setQuestions] = useState([])

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

    useLayoutEffect(()=>{
      navigation.setOptions({
          title:'Danh sách câu hỏi'
      })
  },[navigation])

  return (
    <SafeAreaView style={{flex:1,position:'relative',backgroundColor:'white'}}>
      <StatusBar style='light'/>
      {console.log(questions)}
     <ScrollView style={{marginHorizontal: 20,}}>
       {
         questions.length ===0?<Text>Đang tải dữ liệu</Text>:
         questions.map(({id,data:{question}})=>(

          <CustomListQuestionItem
            key={id}
            id={id}
            name={question}
            navigation={navigation}
          />
         ))
       }
     </ScrollView>
     <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuestion')} style={{marginStart:'auto',marginEnd:30,marginBottom:30}}>
        <Icon name="add" size={50} color="#FFFFFF" style={{width:50,height:50,borderRadius:25,backgroundColor:'blue'}}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Quesions

const styles = StyleSheet.create({})