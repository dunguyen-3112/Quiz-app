import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'

const Quesions = () => {
    conts [questions,setQuestions] = useState([])

    useEffect(()=>{
   
        const unSubscribe = db.collection('questions').where('uid','==',auth.currentUser.uid).onSnapshot((snapshot)=>
        //.collection('users').doc(auth.currentUser.uid)
        setQuestions(
            snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
            }))
          )
        )
        return unSubscribe
   
    },[])

  return (
    <SafeAreaView style={{flex:1,position:'relative',backgroundColor:'white',paddingTop: StatusBar.currentHeight,}}>
      <StatusBar style='light'/>
     <ScrollView style={{marginHorizontal: 20,}}>
       {
         quizs.length ===0?<Text>Đang tải dữ liệu</Text>:
         quizs.map(({id,data:{name,idShare}})=>(
          <CustomListItem
            key={id}
            id={id}
            idShare={idShare}
            name={name}
            navigation={navigation}
          />
         ))
       }
     </ScrollView>
     <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddQuestion')} style={{marginStart:'auto',marginEnd:30,marginBottom:30}}>
        <Icon name="code" size={44} color="#ffff" style={{width:50,height:50,borderRadius:25,backgroundColor:'#080080'}}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Quesions

const styles = StyleSheet.create({})