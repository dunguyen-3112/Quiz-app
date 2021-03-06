import { StyleSheet, Text, View ,KeyboardAvoidingView} from 'react-native'
import React, { useState ,useEffect} from 'react'
import { Button,Image, Input } from '@rneui/base'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'


const LoginScreen = ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [])
  const signIn = ()=>{
    auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light'/>
          <Image source={{
            uri:'https://i.pinimg.com/originals/d0/33/30/d0333051d24ff9adba8cc63b100016a9.png'
          }}
        style={{width:200,height:200}}
        />
        <View style={styles.inputContainer}>
          <Input 
          placeholder='Email' 
          autoFocus type='email' 
          value={email} 
          onChangeText={text=>setEmail(text)}
          />
          <Input 
          placeholder='Password' 
          secureTextEntry 
          type='password'
          value={password} 
          onChangeText={text=>setPassword(text)} 
          />
        </View>
          <Button 
            title='Login' 
            containerStyle={styles.button} 
            onPress={signIn}
          />
          <Button 
            title='Register' 
            type='outline' 
            containerStyle={styles.button}
            onPress={()=>{navigation.navigate('Register')}}
          />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
    marginTop:10,
  }
})