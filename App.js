import { StyleSheet,View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen'

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
