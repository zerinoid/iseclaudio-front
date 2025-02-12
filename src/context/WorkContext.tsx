'use client'

import Work from '@/models/Work'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  FC,
  useContext
} from 'react'
import exhibitionsData from '@/mocks/exhibitions'
import projects from '@/mocks/projects'

interface IWorkContext {
  exhibitions: Work[]
  currentExhibition: Work
  setCurrentExhibition: Dispatch<SetStateAction<Work>>
  currentProject: Work
  setCurrentProject: Dispatch<SetStateAction<Work>>
}
interface IWorkProvider {
  children: ReactNode
}

const WorkContext = createContext<IWorkContext | null>(null)

const WorkProvider: FC<IWorkProvider> = ({ children }) => {
  const [exhibitions] = useState<Work[]>(exhibitionsData)
  const [currentExhibition, setCurrentExhibition] = useState<Work>(
    exhibitionsData[0]
  )
  const [currentProject, setCurrentProject] = useState<Work>(projects[0])

  return (
    <WorkContext.Provider
      value={{
        exhibitions,
        currentExhibition,
        setCurrentExhibition,
        currentProject,
        setCurrentProject
      }}
    >
      {children}
    </WorkContext.Provider>
  )
}
function useWork(): IWorkContext {
  const context = useContext(WorkContext)
  if (!context) {
    throw new Error('useWork must be used within an WorkProvider')
  }
  return context
}

export { useWork, WorkProvider }
