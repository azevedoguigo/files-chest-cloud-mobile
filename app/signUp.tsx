import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { api } from '../src/lib/api'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      await api.post('/users', {
        name,
        email,
        password
      })
    } catch(error) {
      alert('Ooops! Something went wrong during registration.')
    }
  }

  return (
    <View className='justify-center items-center h-5/6'>
      <View className=' items-center border border-zinc-600 w-11/12 p-2 rounded-md'>
        <Text className='text-zinc-50 text-lg font-bold mb-4'>
          SignUp
        </Text>

        <TextInput 
          className='bg-zinc-600 text-zinc-50 rounded-md w-11/12 py-2 px-4'
          onChangeText={setName}
          placeholder='Your Name'
        />
        
        <TextInput 
          className='bg-zinc-600 text-zinc-50 rounded-md w-11/12 py-2 px-4 mt-2'
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

        <TouchableOpacity
          activeOpacity={0.8}
          className='items-center justify-center py-2 bg-green-500 rounded-md w-11/12 mt-2'
          onPress={handleLogin}
        >
          <Text className='text-zinc-50 font-bold'>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}