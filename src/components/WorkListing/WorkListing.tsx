import Work from '@/models/Work'
import { FC } from 'react'

type Props = {
  works: Work[]
}

const WorkListing: FC<Props> = ({ works }) => {
  return (
    <ul>
      {works.map(work => (
        <li className="mb-9" key={work.id}>
          <button className="uppercase text-4xl hover:text-5xl decoration-double">
            {work.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default WorkListing
