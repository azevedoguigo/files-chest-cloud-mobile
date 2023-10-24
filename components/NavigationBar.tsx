import { View } from 'react-native';
import { Files, UploadCloud, User, Settings } from 'lucide-react-native'
import { Link } from 'expo-router';

export default function NavigationBar() {
  return(
    <View 
        className='flex-row items-center justify-around bg-zinc-950 w-screen h-14'
      >
        <Link href='/'>
          <Files color='#71717a' size={38} />
        </Link>
        <UploadCloud color='#71717a' size={38} />
        <User color='#71717a' size={38} />
        <Settings color='#71717a' size={38} />
    </View>
  )
}