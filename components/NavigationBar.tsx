import { View } from 'react-native';
import { Files, UploadCloud, User, Settings } from 'lucide-react-native'

export default function NavigationBar() {
  return(
    <View 
        className='flex-row items-center justify-around bg-zinc-950 w-screen h-14'
      >
        <Files color='#71717a' size={38} />
        <UploadCloud color='#71717a' size={38} />
        <User color='#71717a' size={38} />
        <Settings color='#71717a' size={38} />
    </View>
  )
}