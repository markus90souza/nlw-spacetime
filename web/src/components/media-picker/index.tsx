'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export const MediaPicker = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    const previousUrl = URL.createObjectURL(files[0])

    setPreview(previousUrl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="cover_url"
        type="file"
        id="media"
        className="invisible h-0 w-0"
      />

      {preview && (
        <Image
          src={preview}
          alt=""
          width={400}
          height={400}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
