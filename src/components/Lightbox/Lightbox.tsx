'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './Lightbox.module.css'
import gsap from 'gsap'

type Props = {
  imageSrc: string
  isOpen: boolean
  onClose: () => void
  alt: string
}

export default function Lightbox({ imageSrc, isOpen, onClose, alt }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle lightbox open/close animations
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return

    // Fade in animation
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }

    // Handle key press (ESC)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Handle mouse movement for parallax on desktop
  useEffect(() => {
    if (!isOpen || isMobile || !imageRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!imageWrapperRef.current) return

      const rect = imageWrapperRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate normalized position (-1 to 1)
      const x = (e.clientX - rect.left - centerX) / centerX
      const y = (e.clientY - rect.top - centerY) / centerY

      setMousePos({ x, y })

      // Apply parallax transform
      const offsetX = x * 180 // Adjust range as needed
      const offsetY = y * 360

      gsap.to(imageRef.current, {
        x: offsetX,
        y: offsetY,
        duration: 0.1,
        overwrite: 'auto'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isOpen, isMobile])

  const handleClose = () => {
    if (!overlayRef.current || !imageRef.current) return

    // Fade out animation
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose
    })

    gsap.to(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        <div ref={imageWrapperRef} className={styles.imageWrapper}>
          <div ref={imageRef} className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(max-width: 100vw) 100vw, 90vw"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
