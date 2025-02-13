'use client'
import Gallery from '@/components/Gallery/Gallery'
import WorkListing, { WorkTypes } from '@/components/WorkListing/WorkListing'
import exhibitions from '@/mocks/exhibitions'
import { WorkProvider } from '@/context/WorkContext'

export default function Exhibitions() {
  return (
    <WorkProvider>
      <div className="md:grid grid-cols-2 md:w-11/12">
        <div className="hidden md:block relative">
          <div className="sticky top-7">
            <h1 className="font-bold text-5xl mb-12">EXHIBITIONS:</h1>
            <WorkListing works={exhibitions} workType={WorkTypes.exhibition} />
          </div>
        </div>
        <Gallery />
      </div>
    </WorkProvider>
  )
}
