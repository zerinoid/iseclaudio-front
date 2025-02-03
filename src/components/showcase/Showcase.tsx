'use client'
import { useRef } from 'react'
import Image from 'next/image'
import styles from './Showcase.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Showcase() {
  const container = useRef(null as unknown as HTMLDivElement)
  const footer = useRef(null as unknown as HTMLDivElement)
  const lastCard = useRef(null as unknown as HTMLDivElement)
  const heroRef = useRef(null as unknown as HTMLDivElement)
  const pinnedRef = useRef([] as HTMLDivElement[])

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

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=400vh',
        scrub: 1,
        onUpdate: self => {
          const opacityProgress = self.progress
          heroRef.current.style.opacity = String(1 - opacityProgress)
        }
      })
    },
    { scope: container }
  )

  const array = [
    '/exhib1/img1.jpg',
    '/exhib1/img2.jpg',
    '/exhib1/img3.jpg',
    '/exhib1/img4.jpg',
    '/exhib1/img5.jpg',
    '/exhib1/img6.jpg'
  ]

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
                  pinnedRef.current[idx] = el as HTMLDivElement
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
