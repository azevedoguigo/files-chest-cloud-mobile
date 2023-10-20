import { View } from 'react-native';
import { Home, File, Settings } from 'lucide-react-native'

export default function NavigationBar() {
  return(
    <View 
        className='flex-row items-center justify-around bg-zinc-950 w-screen h-14'
      >
        <Home color='#71717a' size={38} />
        <File color='#71717a' size={38} />
        <Settings color='#71717a' size={38} />
    </View>
  )
}