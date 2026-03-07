import { useWork } from '@/context/WorkContext'
import Work from '@/models/Work'
import { FC } from 'react'

export enum WorkTypes {
  project = 'project',
  exhibition = 'exhibition'
}

type Props = {
  works: Work[]
  workType: WorkTypes
}

const WorkListing: FC<Props> = ({ works, workType }) => {
  const {
    currentExhibition,
    setCurrentExhibition,
    currentProject,
    setCurrentProject
  } = useWork()

  const currentWork = {
    exhibition: setCurrentExhibition,
    project: setCurrentProject
  }

  const setWork = (work: Work, workType: WorkTypes) => {
    currentWork[workType](work)
  }

  return (
    <ul className="mb-16">
      {works.map(work => {
        const activeWork =
          work?.name == currentExhibition?.name ||
          work?.name == currentProject?.name

        if (work.images?.length > 0) {
          return (
            <li className="mb-9" key={work.id}>
              <button
                onClick={() => setWork(work, workType)}
                className={`uppercase text-3xl md:hover:font-bold decoration-double ${
                  activeWork ? 'text-5xl' : null
                } text-left`}
              >
                {work?.name}
              </button>
            </li>
          )
        }
      })}
    </ul>
  )
}

export default WorkListing
