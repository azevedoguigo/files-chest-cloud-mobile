import { useEffect, useState } from 'react'
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View
} from 'react-native'
import { router } from 'expo-router'
import { api } from '../src/lib/api'
import { Download, File, FileMinus } from 'lucide-react-native'

import * as FileSystem from 'expo-file-system'
import * as MediaLibary from 'expo-media-library'

import jwtDecode from 'jwt-decode'
import * as SecureStore from 'expo-secure-store'
import NavigationBar from '../components/NavigationBar'

type DecodedToken = {
  exp: string,
  sub: string
}

export default function Index() {
  const [files, setFiles] = useState([])

  async function loadFilesList() {
    const token = await SecureStore.getItemAsync('token')

    if(!token)
      router.push('/signIn')

    const decodedtoken: DecodedToken = jwtDecode(token)

    if(Date.now() >= parseInt(decodedtoken.exp) * 1000)
      router.push('/signIn')

    const response = await api.get('/cloud/list-files', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    setFiles(response.data)
  }

  useEffect(() => {
    loadFilesList()
  }, [])

  async function download(key: String) {
    try {
      const token = await SecureStore.getItemAsync('token')

      const response = await api.get('/cloud/download', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'filename': key
        }
      })

      const downloadURL = response.data.download_url

      await MediaLibary.requestPermissionsAsync()

      const {uri: localUri} = await FileSystem.downloadAsync(downloadURL, FileSystem.documentDirectory + key)

      const asset = await MediaLibary.createAssetAsync(localUri)
      const album = await MediaLibary.getAlbumAsync('Download')

      if(!album) {
        await MediaLibary.createAlbumAsync('Download', asset, false)
        alert('File downloaded successfully!')
      }

      await MediaLibary.addAssetsToAlbumAsync([asset], album, false)
      alert('File downloaded successfully!')
    } catch(error) {
      alert('Failed to downloading file!')
    }
  }

  async function deleteFile(key: String) {
    try {
      const token = await SecureStore.getItemAsync('token')

      await api.delete('/cloud/delete-file', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'filename': key
        }
      })

      alert('File deleted successfully!')
      await loadFilesList()
    } catch(error) {
      alert('Failed to delete the file!')
    }
  }

  return (
    <View className='flex-1 justify-between items-center bg-zinc-900 h-full'>
      <ScrollView 
        className='mt-8 w-11/12 border border-zinc-600 rounded-md mb-4'
        contentContainerStyle={{ padding: 14 }}
      >
        <Text className='text-zinc-50 text-lg font-bold'>
            All Files
        </Text>

        {files.map((file) => {
          return (
            <View 
              key={file.key}
              className='bg-zinc-600 rounded-md py-2 px-1 mt-2 mb-2'
            >
              <View className='flex-row items-center justify-center'>
                <File color='#71717a' />
                <Text 
                  className='text-zinc-50 font-bold ml-1'
                >
                  {file.key}
                </Text>
              </View>

              <View className='px-2 py-1'>
                <Text className='text-zinc-50'>
                  Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Text>
                <Text className='text-zinc-50'>
                  Uploaded At: {file.last_modified}
                </Text>

                <View className='flex-row justify-around mt-2'>
                  <TouchableOpacity
                    className='flex-row items-center justify-center'
                    onPress={() => download(file.key)}
                  >
                    <Download color='#71717a'/>
                    <Text className='text-zinc-50 font-bold ml-2'
                    >
                      Download
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className='flex-row items-center justify-center'
                    onPress={() => deleteFile(file.key)}
                  >
                    <FileMinus color='#71717a'/>
                    <Text className='text-zinc-50 font-bold ml-2'
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
      <NavigationBar />
    </View>
  )
}