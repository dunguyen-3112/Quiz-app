import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from "@rneui/themed";


const CustomListItem = ({id,name,navigation}) => {

    const handlePress = ()=>{
        navigation.navigate('Quiz',{id:id})
    }
  return (
    <ListItem  bottomDivider onPress={handlePress}>
     <ListItem.Content style={{flexDirection:'row',justifyContent:'flex-start'}}>
     <Avatar
            size={56}
            rounded
            source={{ uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}}
        />
        <ListItem.Title style={{fontWeight:"800",alignSelf:'center',marginStart:20, fontSize:20}}>{name}</ListItem.Title>
     </ListItem.Content>

    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})