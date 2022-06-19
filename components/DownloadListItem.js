import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import colors from 'webpack-dev-server/lib/utils/colors';
import { Button } from '@rneui/base';
import {auth,db} from '../firebase'


const DownloadListItem = ({name, description, questions}) => {
    
    const handlePressDown = ()=>{
        db.collection('quizs').add({
        description:description,
        name:name,
        questions:questions,
        uid:auth.currentUser.uid
      })
      alert('Download thành công')
    }


  return (
    <ListItem  bottomDivider>
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
        title='Download'
        onPress={handlePressDown}
      ></Button>
      

    </ListItem>
  )
}

export default DownloadListItem

const styles = StyleSheet.create({})