import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import Image from 'next/image'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
dayjs.locale(ptBR)
type Params = {
  params: {
    id: string
  }
}

// export async function generateStaticParams({ params: { id } }: Params) {
//   const { data } = await api.get(`/memories/${id}`)

//   console.log(data)

//   return data
// }

type Memory = {
  id: string
  cover_url: string
  content: string
  created_at: string
  is_public: boolean
}

export default async function MemoriesDetails({ params: { id } }: Params) {
  const token = cookies().get('token')?.value

  const { data } = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = data

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <Link
        href={'/'}
        className="items-centertext-sm flex gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h4 w-4" />
        Voltar á timeline
      </Link>

      <div key={memory.id} className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm uppercase text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.created_at).format('D[ de ]MMMM[ de ]YYYY')}
        </time>

        <Image
          className="aspect-video w-full rounded-lg object-cover"
          src={memory.cover_url}
          width={592}
          height={280}
          alt=""
        />

        <p className="text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </div>
    </div>
  )
}
