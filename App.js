import { StyleSheet,View,Text } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen'
import AddQuestionScreen from './screens/AddQuestionScreen';
import AddQuizScreen from './screens/AddQuizScreen';
import QuizScreen from './screens/QuizScreen';
import Result from './screens/Result';
import DownloadQuiz from './screens/DownloadQuiz';
import firebase from 'firebase';

const Stack = createNativeStackNavigator()
const globalScreenOptions = {
  headerStyle:{backgroundColor:'#2C6BED'},
  headerTitleStyle:{color:'while'},
  headerTintColor:'white'
}
export default function Anpmpp() {
  return (
   <NavigationContainer>
     <Stack.Navigator screenOptions={globalScreenOptions}>
       <Stack.Screen name='Login' component={LoginScreen}/>
       <Stack.Screen name='Register' component={RegisterScreen} />
       <Stack.Screen name='Home' component={HomeScreen} />
       <Stack.Screen name='AddQuestion' component={AddQuestionScreen} />
       <Stack.Screen name='AddQuiz' component={AddQuizScreen} />
       <Stack.Screen name='Quiz' component={QuizScreen} />
       <Stack.Screen name='DownloadQuiz' component={DownloadQuiz} />
       <Stack.Screen name='Result' component={Result}/>
     </Stack.Navigator>
   </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
