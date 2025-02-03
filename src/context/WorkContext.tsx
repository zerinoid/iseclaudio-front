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

interface IWorkContext {
  exhibitions: Work[]
  currentExhibition: Work
  setCurrentExhibition: Dispatch<SetStateAction<Work>>
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

  return (
    <WorkContext.Provider
      value={{ exhibitions, currentExhibition, setCurrentExhibition }}
    >
      {children}
    </WorkContext.Provider>
  )
}
function useWork(): IWorkContext {
  const context = useContext(WorkContext)
  if (!context) {
    throw new Error('useWork must be used within an EquipeProvider')
  }
  return context
}

export { useWork, WorkProvider }
