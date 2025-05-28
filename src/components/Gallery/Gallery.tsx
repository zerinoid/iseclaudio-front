'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Gallery.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScreenSize from '@/hooks/useScreenSize'
import Breakpoints from '@/models/Breakpoints'
import Work from '@/models/Work'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type Props = {
  currentWork: Work
}

export default function Gallery({ currentWork }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const footer = useRef<HTMLDivElement>(null)
  const lastCard = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const [screenWidth] = useScreenSize()
  const isMd = screenWidth! > Breakpoints.md
  const images = currentWork.images

  // Clean up ScrollTriggers when the component updates or unmounts
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }

    const triggers = ScrollTrigger.getAll() // Store existing ScrollTriggers
    return () => {
      triggers.forEach(trigger => trigger.kill()) // Kill all ScrollTriggers
    }
  }, [currentWork]) // Re-run cleanup when currentExhibition changes

  useGSAP(
    () => {
      // Only reset pinnedRef after initial load
      if (!isInitialLoad) {
        pinnedRef.current = []
      }

      const pinnedSections: HTMLDivElement[] = gsap.utils.toArray(
        pinnedRef.current
      )
      console.log(pinnedSections, '### pinnedSections  ###')

      pinnedSections.forEach((section: HTMLDivElement, index: number) => {
        if (!section || !section.children[0]) return // Ensure the section and its child exist

        const img = section.children[0]
        const nextSection: HTMLElement =
          pinnedSections[index + 1] || lastCard.current!

        // Ensure nextSection and footer exist before accessing their properties
        if (!nextSection || !footer.current) return

        if (index < pinnedSections.length - 1) {
          const endScalePoint = `top+=${
            nextSection.offsetTop - section.offsetTop
          } top`

          gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: footer.current.offsetTop - window.innerHeight,
              pin: true,
              pinSpacing: false,
              scrub: 1,
              invalidateOnRefresh: true // Add this line
            }
          })

          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: endScalePoint,
                scrub: 1,
                invalidateOnRefresh: true // Add this line
              }
            }
          )
        }
      })
    },
    { scope: container, dependencies: [currentWork] } // Re-run animations when currentExhibition changes
  )

  return (
    <section key={currentWork.id}>
      <div ref={container}>
        {images?.map((pic, idx, arr) => {
          const className =
            idx === arr.length - 1 ? styles.scroll : styles.pinned
          return (
            <div
              key={idx}
              ref={el => {
                if (el) pinnedRef.current[idx] = el
              }}
              className={`${styles.card} ${className}`}
            >
              <div className={styles.img}>
                <Image src={pic} alt={pic} width={800} height={700} />
              </div>
            </div>
          )
        })}
        <div ref={footer} className={styles.footer}></div>
      </div>
    </section>
  )
}
