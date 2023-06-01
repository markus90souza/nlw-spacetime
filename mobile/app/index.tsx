/* eslint-disable no-unused-vars */
import { styled } from 'nativewind'
import { Text, TouchableOpacity, View } from 'react-native'

import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store'

import NlwSpacetimeLogo from '../src/assets/nlw-spacetime-logo.svg'

import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../src/libs/api'

import { useRouter } from 'expo-router'

const NLWSpacetime = styled(NlwSpacetimeLogo)

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/4330bcd270c18eb9b0ca',
}

WebBrowser.maybeCompleteAuthSession()

export default function App() {
  const { push } = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '4330bcd270c18eb9b0ca',
      scopes: ['identity'],

      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )

  const handleOAuthGithubCode = async (code: string) => {
    const response = await api.post('/register', { code })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleOAuthGithubCode(code)

      push('/memories')
    }
  }, [response])

  return (
    <>
      <View className="flex-1 items-center px-8 py-10">
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
            onPress={() => signInWithGithub()}
          >
            <Text className="font-alt text-sm uppercase text-black">
              COMEÇAR A CADASTRAR
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da Rocketseat
        </Text>
      </View>
    </>
  )
}
