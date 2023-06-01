import { EmptyMemories } from '@/components/empty-memories'
import { api } from '@/libs/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

dayjs.locale(ptBR)

type Memory = {
  id: string
  cover_url: string
  excerpt: string
  created_at: string
  is_public: boolean
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const { data } = await api.get('/memories', {
    headers: { Authorization: `Bearer ${token}` },
  })

  const memories: Memory[] = data

  if (memories.length === 0) {
    return <EmptyMemories />
  }
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
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
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-gray-200 hover:text-gray-100 "
            >
              Ler Mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
