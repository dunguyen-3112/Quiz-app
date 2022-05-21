import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth } from '../firebase'
import { Avatar } from '@rneui/base'
import Question from '../screens/Question'

const HomeScreen = ({navigation}) => {
  const signOutUser = ()=>{
    auth
        .signOut().then(()=>{
          navigation.replace("Login")
        })
  }

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
      )
    })
  })
  return (
    <SafeAreaView>
     <ScrollView>
      <Question text='1. Em bao nhieu tuoi?'/>
     </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})