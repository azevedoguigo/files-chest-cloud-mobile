import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'
import { Link } from 'expo-router'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      const response = await api.post('/users/signin', {
        email,
        password
      })

      await SecureStore.setItemAsync('token', response.data.token)
    } catch(error) {
      alert('Ooops! Something went wrong during login.')
    }
  }

  return(
    <View className='flex-1 bg-zinc-950 justify-center items-center h-5/6'>
      <View className=' items-center border border-zinc-600 w-11/12 p-2 rounded-md'>
        <Text className='text-zinc-50 text-lg font-bold mb-4'>
          SignIn
        </Text>
        
        <TextInput 
          className='bg-zinc-600 text-zinc-50 rounded-md w-11/12 py-2 px-4'
          inputMode='email'
          onChangeText={setEmail}
          placeholder='Your Email'
        />

        <TextInput 
          className='bg-zinc-600 text-zinc-50 rounded-md w-11/12 py-2 px-4 mt-2'
          onChangeText={setPassword}
          secureTextEntry
          placeholder='Your Password'
        />

        <Link href='/' asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogin}
            className='items-center bg-green-500 p-2 w-11/12 mt-2 rounded-md'
          >
            <Text className='text-zinc-50 font-bold'>
              Let's go!
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}