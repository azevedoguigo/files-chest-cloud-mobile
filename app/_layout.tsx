import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import SignIn from './signIn'

export default function Layout() {
  return(
    <View className='bg-zinc-900 h-screen w-screen justify-between'>
      <SignIn />
      <NavigationBar />
      <StatusBar style='auto'/>
    </View>
  )
}