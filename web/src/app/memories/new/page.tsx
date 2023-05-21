import { Camera, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function New() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href={'/'}
        className="items-centertext-sm flex gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h4 w-4" />
        Voltar á timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
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
        <input type="file" id="media" className="invisible h-0 w-0" />

        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />
      </form>
    </div>
  )
}
