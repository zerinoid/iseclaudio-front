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

  const setWork = (work: Work, workType: WorkTypes) => {
    if (workType === WorkTypes.project) {
      setCurrentProject(work)
    } else {
      setCurrentExhibition(work)
    }
  }

  return (
    <ul>
      {works.map(work => {
        const activeWork =
          work?.name == currentExhibition?.name ||
          work?.name == currentProject?.name

        return (
          <li className="mb-9" key={work.id}>
            <button
              onClick={() => setWork(work, workType)}
              className={`uppercase text-4xl hover:text-5xl decoration-double ${
                activeWork ? 'font-bold' : null
              } text-left`}
            >
              {work.images?.length > 0 ? work?.name : null}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default WorkListing
