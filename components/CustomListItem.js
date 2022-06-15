import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import colors from 'webpack-dev-server/lib/utils/colors';
import { Button } from '@rneui/base';
import {auth,db} from '../firebase'
import Question from './Question';


const CustomListItem = ({id,name, description, questions,navigation}) => {

  const handlePress = ()=>{
    navigation.navigate('Quiz',{id:id})
  }
  
  const handlePressUp = ()=>{
    db.collection('ShareQuiz').add({
      description:description,
      name:name,
      questions:questions
    })
    alert('upload thành công')
  }
  return (
    <ListItem  bottomDivider onPress={handlePress}>
      <ListItem.Content style={{
        borderRadius:5,
        flexDirection:'row',
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems:'center',
        justifyContent:'flex-start'}}>
        <Avatar
          size={56}
          rounded
          source={{ uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}}
        />
        <ListItem.Title style={{
          fontWeight:"800",
          marginStart:15, 
          fontSize:20}}>{name}</ListItem.Title>

        <ListItem.Title style={{
          fontWeight:"200",
          marginStart:10, 
          fontSize:15}}>{description}</ListItem.Title>
      </ListItem.Content>
      <Button 
        title='Up'
        onPress={handlePressUp}
      ></Button>
      

    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})