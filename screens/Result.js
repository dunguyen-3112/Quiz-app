import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db,auth } from '../firebase'
import * as firebase from 'firebase'
import routes from 'webpack-dev-server/lib/utils/routes'

const Result = ({navigation,route}) => {

    const [result,setResult] = useState([])

    useEffect(()=>{
      //   db.collection('demo').add({
      //     questions:1,
      //     name:'abc',
      //     uid:auth.currentUser.uid
      // })
      // .then(()=>{}).catch(error=>alert(error))

      const unSubscribe = db.collection('quiz').doc(route.params.id).collection('result').where('uid','==',auth.currentUser.uid).onSnapshot((snapshot)=>
      setResult(
        snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
        }))
      ))
      return unSubscribe
    },[])
  return (
    <View>
      <Text>Result</Text>
      {
        console.log(result)
      }
    </View>
  )
}

export default Result

const styles = StyleSheet.create({})