import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Shared behaviour of the brand and service pages. */

// Top bar turns ink over light sections and white over dark ones (each
// section declares its tone in data-bar). `key` resets it per page.
export function useBarTone(rootRef, key) {
  const [tone, setTone] = useState('dark')
  useEffect(() => {
    const probeY = 44
    const update = () => {
      const sections = rootRef.current?.querySelectorAll('[data-bar]') ?? []
      for (const el of sections) {
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= probeY && bottom > probeY) {
          setTone(el.dataset.bar)
          return
        }
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [rootRef, key])
  return tone
}

// Below-the-fold reveals for every [data-reveal] element. The hero
// entrance is pure CSS so the prerendered HTML never flashes before
// hydration.
export function useScrollReveal(rootRef, deps) {
  useEffect(() => {
    const mm = gsap.matchMedia(rootRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export const pad = (n) => String(n).padStart(2, '0')

// Never break "H Group" across two lines.
export const keepTogether = (s) => s.replace(/H Group/g, 'H Group')
