'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './Gallery.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Work from '@/models/Work'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin)
}

type Props = {
  currentWork: Work
}

export default function Gallery({ currentWork }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const footer = useRef<HTMLDivElement>(null)
  const lastCard = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement[]>([])

  const images = currentWork.images

  // Clean up ScrollTriggers when the component updates or unmounts
  useEffect(() => {
    // Smooth scroll to top using GSAP
    gsap.to(window, {
      scrollTo: {
        y: 0,
        autoKill: false
      },
      duration: 1.5,
      ease: 'power2.inOut',
      overwrite: 'auto'
    })

    const triggers = ScrollTrigger.getAll() // Store existing ScrollTriggers
    return () => {
      triggers.forEach(trigger => trigger.kill()) // Kill all ScrollTriggers
      // Only keep refs for current images
      pinnedRef.current = pinnedRef.current.slice(0, images?.length || 0)
    }
  }, [currentWork]) // Re-run cleanup when currentExhibition changes

  useGSAP(
    () => {
      const pinnedSections: HTMLDivElement[] = gsap.utils.toArray(
        pinnedRef.current.filter(Boolean)
      )

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
                if (el) {
                  pinnedRef.current[idx] = el
                } else if (pinnedRef.current[idx]) {
                  // Clean up ref if element is unmounted
                  pinnedRef.current[idx] = null!
                }
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
