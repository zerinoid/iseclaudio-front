import { useState, useEffect } from 'react'

type ScreenSize = {
  width: number | undefined
  height: number | undefined
}

const useScreenSize = (): number[] => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: undefined,
    height: undefined
  })

  // width: window?.innerWidth,
  //   height: window?.innerHeight
  useEffect(() => {
    if (window)
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const screenWidth = screenSize.width,
    screenHeight = screenSize.height
  return [screenWidth, screenHeight]
}

export default useScreenSize
