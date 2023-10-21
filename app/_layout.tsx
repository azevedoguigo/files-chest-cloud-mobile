import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import SignUp from './signUp'

export default function Layout() {
  return(
    <View className='bg-zinc-900 h-screen w-screen justify-between'>
      <SignUp />
      <NavigationBar />
      <StatusBar style='auto'/>
    </View>
  )
}