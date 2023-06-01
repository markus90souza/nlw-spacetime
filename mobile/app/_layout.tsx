import { useState, useEffect } from 'react'
import { styled } from 'nativewind'
import { ImageBackground, StatusBar } from 'react-native'

import StripesSVG from '../src/assets/stripes.svg'
import bgBlur from '../src/assets/bg-blur.png'

import { SplashScreen, Stack } from 'expo-router'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import * as SecureStore from 'expo-secure-store'
const Stripes = styled(StripesSVG)
export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null)

  useEffect(() => {
    const getToken = () => {
      SecureStore.getItemAsync('token').then((token) => {
        setIsAuthenticated(!!token)
      })
    }

    getToken()
  }, [])

  const [fontsLoaded] = useFonts({
    BaiJamjuree_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="relative flex-1 bg-gray-900 "
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Stripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isAuthenticated!} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
