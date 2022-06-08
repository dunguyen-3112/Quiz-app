import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import * as firebase from 'firebase'
import {db,auth} from '../firebase'
import CustomListItem from '../components/CustomListItem'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({navigation}) => {

  const [quizs,setQuizs] = useState([])
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
   
      const unSubscribe = db.collection('users').doc(auth.currentUser.uid).collection('quizs').onSnapshot((snapshot)=>
        setQuizs(
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
        <View style={{marginLeft:20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{uri:auth?.currentUser?.photoURL}}/>
          </TouchableOpacity>
        </View>
      ),
      headerRight:()=>(
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            width:80,
            marginRight:20,
          }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuiz')}>
              <AntDesign name="camerao" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuestion')}>
              <SimpleLineIcons name="pencil" size={24} color="black"/>
            </TouchableOpacity>
          </View>
    )
    })
  },[navigation])
  return (
    <SafeAreaView>
     <ScrollView>
       {
         quizs.length ===0?<Text>Đang tải dữ liệu</Text>:
         quizs.map(({id,data:{name}})=>(
          <CustomListItem
            key={id}
            id={id}
            name={name}
            navigation={navigation}
          />
         ))
       }
     </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})