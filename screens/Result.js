import { ScrollView, StyleSheet, Text, View,  SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db,auth } from '../firebase'

import ItemResult from '../components/ItemResult'

const Result = ({route}) => {

    const [result,setResult] = useState([])

    useEffect(()=>{
      const unSubscribe =   db.collection('quizs').doc(route.params.id).collection('result').onSnapshot((snapshot)=>
        setResult(snapshot.docs.map(doc=>(doc.data())))
      )
      return unSubscribe
    },[])
  return (
    <SafeAreaView>
      <ScrollView>
      {
        result.length===0?<Text>Đang tải dữ liệu</Text>:<View>
        {
          result.map((item,index)=>(
            <ItemResult data={item} key={index}/>
          ))
        }
      </View>
      }
    </ScrollView>
  </SafeAreaView>
  )
}

export default Result

const styles = StyleSheet.create({})