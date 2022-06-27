import { StyleSheet,Alert, NativeAppEventEmitter} from 'react-native'
import React from 'react'
import { ListItem } from "@rneui/themed";
import { db } from '../firebase';


const CustomListItem = ({id,name,navigation}) => {


  const showConfirmDialog = () => {
    return Alert.alert(
      "Bạn có chắc không?",
      "Bạn có chắc chắn muốn loại câu hỏi này không",
      [
        // The "Yes" button
        {
          text: "Vâng",
          onPress: () => {
        
            db.collection('questions').doc(id).delete()
            .then(()=>{
              alert("Xoa thanh cong")
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
  
  return (
    <ListItem  bottomDivider  onLongPress={showConfirmDialog} >
     <ListItem.Content style={{flexDirection:'row',justifyContent:'flex-start'}}>
        <ListItem.Title style={{fontWeight:"700",alignSelf:'center',marginStart:5, fontSize:18}}>{name}</ListItem.Title>
     </ListItem.Content>

    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})