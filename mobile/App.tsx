import { styled } from 'nativewind'
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import bgBlur from './src/assets/bg-blur.png'
import StripesSVG from './src/assets/stripes.svg'
import NlwSpacetimeLogo from './src/assets/nlw-spacetime-logo.svg'
const Stripes = styled(StripesSVG)

const NLWSpacetime = styled(NlwSpacetimeLogo)

export default function App() {
  const [fontsLoaded] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <ImageBackground
        source={bgBlur}
        className="relative flex-1 items-center bg-gray-900 px-8 py-10"
        imageStyle={{ position: 'absolute', left: '-100%' }}
      >
        <Stripes className="absolute left-2" />

        <View className="flex-1 items-center justify-center gap-6">
          <NLWSpacetime />
          <View className="space-y-2">
            <Text className="text-center font-title text-2xl leading-tight text-gray-50">
              Sua cápsula do tempo
            </Text>
            <Text className="text-center font-body text-base leading-relaxed text-gray-100">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded-full bg-green-500 px-5 py-2"
          >
            <Text className="font-alt text-sm uppercase text-black">
              COMEÇAR A CADASTRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da Rocketseat
        </Text>
      </ImageBackground>
    </>
  )
}
