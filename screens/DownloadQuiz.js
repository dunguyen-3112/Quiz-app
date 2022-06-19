import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import * as firebase from 'firebase'
import {db,auth} from '../firebase'
import DownloadListItem from '../components/DownloadListItem'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const DownloadQuiz = ({navigation}) => {

  const [shareQuiz,setShareQuiz] = useState([])
  const signOutUser = ()=>{
    auth
        .signOut().then(()=>{
          navigation.replace("Login")
        })
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@quizs', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@quizs')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  storeData({x:1})
  console.log(getData())
  useEffect(()=>{
      const unSubscribe = db.collection('quizs').where('uid','!=',auth.currentUser.uid).onSnapshot((snapshot)=>
        setShareQuiz(
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
      title:"Signal",
      headerStyle:{backgroundColor:'#fff'},
      headerTitleStyle:{color:'#000'},
      headerTintColor:"black",
      headerLeft:()=>(
        <View style={{lexDirection:"row",marginLeft:0, justifyContent:'space-between',width:60}}>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
            <AntDesign name="back" size={24} color="black"/>
          </TouchableOpacity>
        </View>
      )

    })
  },[navigation])
  return (
    <SafeAreaView>
     <ScrollView>
       {
         shareQuiz.length ===0?<Text>Đang tải dữ liệu</Text>:
         shareQuiz.map(({id,data:{name,description,questions}})=>(
          <DownloadListItem
            key={id}
            id={id}
            name={name}
            description={description}
            questions={questions}
            navigation={navigation}
          />
         ))
       }
     </ScrollView>
    </SafeAreaView>
  )
}

export default DownloadQuiz

const styles = StyleSheet.create({})