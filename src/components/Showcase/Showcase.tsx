'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './Showcase.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Link from 'next/link'

gsap.registerPlugin(useGSAP, ScrollTrigger)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin)
}

const array = [
  '/exhib1/img01.webp',
  '/exhib2/img02.webp',
  '/exhib3/img03.webp',
  '/proj1/img04.webp',
  '/proj2/img05.webp',
  '/proj5/img06.webp'
]

export default function Showcase() {
  const container = useRef<HTMLDivElement>(null)
  const footer = useRef<HTMLDivElement>(null)
  const lastCard = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const pinnedRef = useRef<HTMLDivElement[]>([])

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
      pinnedRef.current = pinnedRef.current.slice(0, array?.length || 0)
    }
  }, []) // Re-run cleanup when currentExhibition changes

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
    { scope: container }
  )

  return (
    <>
      <div className={styles.list}></div>
      <div ref={container}>
        <div className={`${styles.hero} ${styles.pinned}`}>
          <h1 ref={heroRef}>Claudio ISE</h1>
        </div>

        {array.map((pic, idx, arr) => {
          if (idx === arr.length - 1) {
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
                className={`${styles.card}  ${styles.scroll}`}
              >
                <div className={styles.buttons}>
                  <Link href="/exhibitions">EXHIBITIONS</Link>
                  <Link href="/projects">projects</Link>
                  <Link href="/contact">contact</Link>
                  <Link href="/bio">bio</Link>
                </div>
              </div>
            )
          } else {
            return (
              <div
                key={idx}
                ref={el => {
                  pinnedRef.current[idx] = el as HTMLDivElement
                }}
                className={`${styles.card} ${styles.pinned}`}
              >
                <div className={styles.img}>
                  <Image src={pic} alt={pic} width={800} height={700} />
                </div>
              </div>
            )
          }
        })}

        <div ref={footer} className={styles.footer}></div>
      </div>
    </>
  )
}
