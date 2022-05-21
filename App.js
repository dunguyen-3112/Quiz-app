import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native';
import Question from './components/Question';
import {fakeData} from './data/fakeData'
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <SafeAreaView>
        <ScrollView>
        <Question text='Question 1' answer={{}}/>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
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
