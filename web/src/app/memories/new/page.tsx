import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { NewMemory } from '@/components/forms/new-memory'

export default function New() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href={'/'}
        className="items-centertext-sm flex gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h4 w-4" />
        Voltar á timeline
      </Link>

      <NewMemory />
    </div>
  )
}
