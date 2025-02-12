import { useWork } from '@/context/WorkContext'
import Work from '@/models/Work'
import { FC } from 'react'

type Props = {
  works: Work[]
}

const WorkListing: FC<Props> = ({ works }) => {
  const { currentExhibition, setCurrentExhibition } = useWork()
  return (
    <ul>
      {works.map(work => {
        const activeWork = work?.name == currentExhibition?.name
        return (
          <li className="mb-9" key={work.id}>
            <button
              onClick={() => setCurrentExhibition(work)}
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
