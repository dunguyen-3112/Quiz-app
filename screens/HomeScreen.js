import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity,AsyncStorage,StatusBar} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import {db,auth} from '../firebase'
import CustomListItem from '../components/CustomListItem'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';


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
      title:auth.currentUser.displayName?auth.currentUser.displayName.substring(0,15):'',
      headerStyle:{backgroundColor:'#fff'},
      headerTitleStyle:{color:'#000'},
      headerTintColor:"black",
      headerLeft:()=>(
        <View style={{marginLeft:5,marginRight:20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{uri:auth?.currentUser?.photoURL}} size={60}/>
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
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuiz')} >
              <FontAwesome5 name={'brain'} size={24} solid />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Questions')}>
              <Icon name="question" size={24} color="black"/>
            </TouchableOpacity>
            
          </View>
    )
    })
  },[navigation])
  return (
    <SafeAreaView style={{flex:1,position:'relative',backgroundColor:'white',paddingTop: StatusBar.currentHeight,}}>
      <StatusBar style='light'/>
     <ScrollView style={{marginHorizontal: 20,}}>
       {
         quizs.length ===0?<Text>??ang t???i d??? li???u</Text>:
         quizs.map(({id,data:{name,idShare}})=>(
          <CustomListItem
            key={id}
            id={id}
            idShare={idShare}
            name={name}
            navigation={navigation}
          />
         ))
       }
     </ScrollView>
     <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('JoinQuiz')} style={{marginStart:'auto',marginEnd:30,marginBottom:30}}>
        <Icon name="code" size={44} color="#FFFFFF" style={{width:50,height:50,borderRadius:25,backgroundColor:'#123456'}}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})