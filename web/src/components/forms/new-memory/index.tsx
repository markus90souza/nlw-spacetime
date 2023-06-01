'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from '@/components/media-picker'
import { FormEvent } from 'react'
import { api } from '@/libs/api'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export const NewMemory = () => {
  const token = cookie.get('token')
  const router = useRouter()
  const handleCreateNewMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const coverUpload = formData.get('cover_url')

    let cover_url = ''

    if (coverUpload) {
      const fileUpload = new FormData()
      fileUpload.set('file', coverUpload)

      const { data } = await api.post('/upload', fileUpload)

      cover_url = data.fileUrl
      console.log(cover_url)
    }

    await api.post(
      '/memories',
      {
        cover_url,
        content: formData.get('content'),
        is_public: formData.get('is_public'),
      },
      { headers: { Authorization: `Bearer ${token}` } },
    )

    router.push('/')
  }

  return (
    <form
      className="flex flex-1 flex-col gap-2"
      onSubmit={handleCreateNewMemory}
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar Media
        </label>

        <label
          htmlFor="is_public"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:right-0"
            name="is_public"
            id="is_public"
            value={'true'}
          />
          Tornar memoria pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="flex items-center justify-center self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Criar
      </button>
    </form>
  )
}
