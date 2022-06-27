import { StyleSheet, Text, View,TouchableOpacity,Clipboard,Alert} from 'react-native'
import React from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { db } from '../firebase';


const CustomListItem = ({id,name,idShare,navigation}) => {

  const copyToClipboard = () => {
    Clipboard.setString(idShare)
  }

  const showConfirmDialog = () => {
    return Alert.alert(
      "Quizzes",
      "Bạn có có muốn xoá bộ câu hỏi này không?",
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: () => {
        
            db.collection('quizs').doc(id).delete()
            .then(()=>{
              alert("Xoá thành công !")
            })
            .catch(err=>{
              alert(err.message)
            })
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Không",
        },
      ]
    )
  }
  

    const handlePress = ()=>{
        navigation.navigate('Quiz',{id:id})
    }
  return (
    <ListItem  bottomDivider  onLongPress={showConfirmDialog} onPress={()=>navigation.navigate('EditQuiz',{id:id})}>
     <ListItem.Content style={{flexDirection:'row',justifyContent:'flex-start'}}>
     {/* <Avatar
            size={56}
            rounded
            source={{ uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg'}}
        /> */}
        <ListItem.Title style={{fontWeight:"800",alignSelf:'center',marginStart:5, fontSize:20}}>{name.substring(0,15)}</ListItem.Title>
        <TouchableOpacity activeOpacity={0.5}
        onPress={handlePress}
        //  onPress={()=>navigation.navigate('Result',{id:id})} 
         style={{marginStart:'auto',marginEnd:20,alignSelf:'center'}}>
              <AntDesign name="eye" size={20} color="blue"/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Result',{id:id})}  style={{marginEnd:20,alignSelf:'center'}} >
              <FontAwesome5 name={'user-friends'} size={20} solid color={'blue'} />
            </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.25} onPress={() => copyToClipboard()} style={{marginEnd:20,alignSelf:'center'}}>
          <AntDesign name="sharealt" size={20} color="blue"/>
        </TouchableOpacity>
     </ListItem.Content>

    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})