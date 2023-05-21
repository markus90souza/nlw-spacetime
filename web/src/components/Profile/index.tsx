import Image from 'next/image'
import { getUser } from '@/libs/auth'

export function Profile() {
  const { name, avatar_url } = getUser()
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatar_url}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[180px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-300">
          Quero sair
        </a>
      </p>
    </div>
  )
}
