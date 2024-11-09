'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import styles from './Gallery.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import exhibitions from '@/mocks/exhibitions'
import Work from '@/models/Work'
import useScreenSize from '@/hooks/useScreenSize'
import Breakpoints from '@/models/Breakpoints'
import WorkListing from '../WorkListing/WorkListing'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Gallery() {
  const [currentGallery] = useState<Work>(exhibitions[0])
  const container = useRef(null as unknown as HTMLDivElement)
  const footer = useRef(null as unknown as HTMLDivElement)
  const lastCard = useRef(null as unknown as HTMLDivElement)
  const pinnedRef = useRef([] as HTMLDivElement[])

  const [screenWidth] = useScreenSize()
  const isMd = screenWidth > Breakpoints.md

  /* const { contextSafe } = useGSAP({ scope: container }); */
  useGSAP(
    () => {
      const pinnedSections: HTMLDivElement[] = gsap.utils.toArray(
        pinnedRef.current
      )

      pinnedSections.forEach(
        (
          section: HTMLDivElement,
          index: number,
          sections: HTMLDivElement[]
        ) => {
          const img = section.children[0]

          const nextSection: HTMLElement = sections[index + 1] || lastCard
          const endScalePoint = `top+=${
            nextSection?.offsetTop - section.offsetTop
          } top`

          gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end:
                index === sections.length
                  ? `+=${lastCard.current.offsetHeight / 2}`
                  : footer.current.offsetTop - window.innerHeight,
              pin: true,
              pinSpacing: false,
              scrub: 1
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
                scrub: 1
              }
            }
          )
        }
      )
    },
    { scope: container }
  )

  return (
    <>
      <div ref={container}>
        {currentGallery.images.map((pic, idx, arr) => {
          const className = !isMd
            ? styles.pinned
            : idx === arr.length - 1
            ? styles.scroll
            : styles.pinned
          return (
            <div
              key={idx}
              ref={el => {
                pinnedRef.current[idx] = el as HTMLDivElement
              }}
              className={`${styles.card} ${className}`}
            >
              <div className={styles.img}>
                <Image src={pic} alt={pic} width={800} height={700} />
              </div>
            </div>
          )
        })}

        {screenWidth <= Breakpoints.md ? (
          <div
            ref={el => {
              pinnedRef.current[pinnedRef.current.length] = el as HTMLDivElement
            }}
            className={`${styles.card} ${styles.scroll} bg-background`}
          >
            <h1 className="font-bold text-5xl mb-12">EXHIBITIONS:</h1>
            <div className="p-8">
              <WorkListing works={exhibitions} />
            </div>
          </div>
        ) : null}
        <div ref={footer} className={styles.footer}></div>
      </div>
    </>
  )
}
