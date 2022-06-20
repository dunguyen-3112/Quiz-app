import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React, { useState ,useEffect} from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import { db,auth } from '../firebase'


const ItemResult = ({data}) => {
    const [item,setItem] = useState(null)

    useEffect(()=>{

        const unSubscribe = db.collection('users').where('uid','==',id).onSnapshot((snapshot)=>
  
        setItem(
          snapshot.docs.map(doc=>(
          doc.data()
          ))
        )
        )
        return unSubscribe
      },[])

   
  return (
    <ListItem  bottomDivider >
     <ListItem.Content style={{flexDirection:'row',justifyContent:'flex-start'}}>
     <Avatar
            size={56}
            rounded
            source={{uri:data.photoURL}}
        />
        <ListItem.Title style={{fontWeight:"800",alignSelf:'center',marginStart:20, fontSize:20}}>
          <Text>{data.displayName}</Text>
          <Text style={{backgroundColor:'#D8BFD8'}}>{data.correctAnswerIndex}</Text>
        </ListItem.Title>

     </ListItem.Content>

    </ListItem>
  )
}

export default ItemResult

const styles = StyleSheet.create({})