import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'


const CustomListItem = ({id,name, description,navigation}) => {

    const handlePress = ()=>{
        navigation.navigate('Quiz',{id:id})
    }
  return (
    <ListItem  bottomDivider onPress={handlePress}>
     <ListItem.Content style={{borderRadius:5,
        flexDirection:'row',
        marginHorizontal: 5,
        alignItems:'center',
        justifyContent:'flex-start'}}>
     <Avatar
            size={56}
            rounded
            source={{ uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}}
        />
        <ListItem.Title style={{fontWeight:"800",alignSelf:'center',marginStart:20, fontSize:20}}>{name}</ListItem.Title>
        <ListItem.Title style={{fontWeight:"200",marginStart:10, fontSize:15}}>{description}</ListItem.Title>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Result',{id:id})} style={{marginStart:'auto',marginEnd:20,alignSelf:'center'}}>
              <AntDesign name="eye" size={24} color="blue"/>
          </TouchableOpacity>
     </ListItem.Content>

    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})