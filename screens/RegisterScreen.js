import { StyleSheet, View,KeyboardAvoidingView } from 'react-native'
import React,{useLayoutEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button,Image, Input ,Text} from '@rneui/base'
import { auth,db } from '../firebase'



const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [imageUrl,setImageUrl] = useState('')


    const createUser = async(uid,displayName,photoURL)=>{
        await db.collection('questions').add({
          uid,
          displayName,
          photoURL,
        })
        .then(()=>{
          navigation.goBack()
        })
        .catch(error=>alert(error))
    }

    const register = ()=>{
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName:name,
          photoURL:imageUrl ||
          'https://media.istockphoto.com/vectors/hipster-man-vector-avatar-vector-id1072484204?k=20&m=1072484204&s=612x612&w=0&h=EaokStoQuejKpBB-xWiOf3KHdF-riHRxEoLGRphccxk='
        })
      })
      .catch(error => alert(error.message))
      //createUser(name,imageUrl||'https://media.istockphoto.com/vectors/hipster-man-vector-avatar-vector-id1072484204?k=20&m=1072484204&s=612x612&w=0&h=EaokStoQuejKpBB-xWiOf3KHdF-riHRxEoLGRphccxk=')
    };

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerTitle:'Register',
        headerBackTitle:"",
      })
    },[navigation])

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light'/>
      <Text h3 style={{marginBottom:50}}>Create Signal Account</Text>
      <View style={styles.inputContainer}>
          <Input 
            placeholder='Full Name' 
            autoFocus 
            type='text'
            value={name}
            onChangeText={text => setName(text)}
          />
          <Input 
            placeholder='Email' 
            type='email'
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Input 
            placeholder='Password' 
            type='password'
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Input 
            placeholder='Profile Picture URL (Optional)'  
            type='text'
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            onSubmitEditing={register}
          />
      </View>
      <Button
        onPress={register}
        title='Register'
        raised
        containerStyle={styles.button}
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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