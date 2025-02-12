'use client'
import Gallery from '@/components/Gallery/Gallery'
import WorkListing from '@/components/WorkListing/WorkListing'
import projects from '@/mocks/projects'
import { WorkProvider } from '@/context/WorkContext'

export default function Projects() {
  return (
    <WorkProvider>
      <div className="md:grid grid-cols-2 md:w-11/12">
        <div className="hidden md:block relative">
          <div className="sticky top-7">
            <h1 className="font-bold text-5xl mb-12">PROJECTS:</h1>
            <WorkListing works={projects} />
          </div>
        </div>
        <Gallery />
      </div>
    </WorkProvider>
  )
}
