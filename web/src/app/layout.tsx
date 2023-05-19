import './globals.css'
import { ReactNode } from 'react'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'

const roboto_flex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
})

const baijamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construida com ReactJS, NextJS, TailwindCSS e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto_flex.className} ${baijamjuree.className}  bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
