import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import NavigationBar from '../components/NavigationBar'

export default function Layout() {
  return(
    <View className='bg-zinc-900 h-screen w-screen justify-between'>
      <View>
        <Text>Olá, mundo!</Text>
      </View>
      <NavigationBar />
      <StatusBar style='auto'/>
    </View>
  )
}