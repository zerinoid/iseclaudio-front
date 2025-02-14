'use client'
import GalleryWrapper from '@/components/GalleryWrapper/GalleryWrapper'
import { WorkTypes } from '@/components/WorkListing/WorkListing'
import { WorkProvider } from '@/context/WorkContext'

export default function Projects() {
  return (
    <WorkProvider>
      <GalleryWrapper workType={WorkTypes.project} />
    </WorkProvider>
  )
}
