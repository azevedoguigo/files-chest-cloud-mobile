import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Layout() {
  return(
    <View className='flex-1 justify-center items-center'>
      <Text>Olá, mundo!</Text>
      <StatusBar style='auto'/>
    </View>
  )
}