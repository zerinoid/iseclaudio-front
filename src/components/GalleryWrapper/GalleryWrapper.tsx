'use client'
import { FC } from 'react'
import Gallery from '@/components/Gallery/Gallery'
import WorkListing, { WorkTypes } from '@/components/WorkListing/WorkListing'
import exhibitions from '@/mocks/exhibitions'
import { useWork } from '@/context/WorkContext'
import projects from '@/mocks/projects'

type Props = {
  workType: WorkTypes
}

const GalleryWrapper: FC<Props> = ({ workType }) => {
  const { currentExhibition, currentProject } = useWork()

  const currentWork = {
    exhibition: {
      data: exhibitions,
      currentData: currentExhibition,
      title: 'EXHIBITIONS'
    },
    project: {
      data: projects,
      currentData: currentProject,
      title: 'PROJECTS'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:w-full relative">
      <div className="mb-2 ml-[-2vw] md:hidden">
        {currentWork[workType].currentData?.caption}
      </div>
      <Gallery currentWork={currentWork[workType].currentData} />
      <div className="md:order-first relative md:pr-8">
        <div className="sticky top-7 mt-6 md:mt-0 md:h-[calc(100vh-100px-1.25rem)]">
          <h1 className="font-bold text-5xl mb-12">
            {currentWork[workType].title}
          </h1>
          <WorkListing works={currentWork[workType].data} workType={workType} />
          <p className="md:pt-16 md:border-t-2 border-white md:w-11/12 hidden md:block md:text-2xl">
            {currentWork[workType].currentData?.caption}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GalleryWrapper
