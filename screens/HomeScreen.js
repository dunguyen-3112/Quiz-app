import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import * as firebase from 'firebase'
import {db,auth} from '../firebase'
import CustomListItem from '../components/CustomListItem'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
  useEffect(()=>{
   
      const unSubscribe = db.collection('quizs').where('uid','==',auth.currentUser.uid).onSnapshot((snapshot)=>
      //.collection('users').doc(auth.currentUser.uid)
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
            width:120,
            marginRight:20,
          }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('DownloadQuiz')}>
              <AntDesign name="download" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuiz')}>
            <FontAwesome5 name={'brain'} size={24} solid />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuestion')}>
              <AntDesign name="question" size={24} color="black"/>
             
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
         quizs.map(({id,data:{name, description}})=>(
          <CustomListItem
            key={id}
            id={id}
            name={name}
            description={description}
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