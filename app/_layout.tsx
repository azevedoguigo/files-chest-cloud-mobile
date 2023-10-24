import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Stack } from 'expo-router/stack'

export default function Layout() {
  return(
    <View className='flex-1'>
      <StatusBar style='auto' />
      
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='signIn' />
        <Stack.Screen name='signUp' />
        <Stack.Screen name='upload' />
      </Stack>
    </View>
  )
}