import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/useLanguage'
import './BrandGallery.css'

const pad = (n) => String(n).padStart(2, '0')

/* Project photos in two groups — a masonry of event photos and a strip
   of creators' story screenshots (UGC) — sharing one full-screen viewer
   that loads the large version on demand. Esc closes, arrow keys
   navigate across both groups, focus returns to the opening tile. */
function BrandGallery({ photos: allPhotos }) {
  const { t, language } = useLanguage()
  const [open, setOpen] = useState(null)
  const tileRefs = useRef([])
  const closeRef = useRef(null)

  const events = allPhotos.filter((p) => !p.story)
  const stories = allPhotos.filter((p) => p.story)
  const photos = [...events, ...stories]
  const count = photos.length

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((dir) => setOpen((i) => (i + dir + count) % count), [count])

  useEffect(() => {
    if (open === null) return undefined
    const opener = tileRefs.current[open]
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      opener?.focus({ preventScroll: true })
    }
    // Only re-run when the viewer opens/closes, not on every photo change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null, close, step])

  const current = open === null ? null : photos[open]

  const tile = (photo) => {
    const i = photos.indexOf(photo)
    return (
      <figure key={photo.id} className="brand-gallery__item" data-reveal>
        <button
          type="button"
          ref={(el) => (tileRefs.current[i] = el)}
          className="brand-gallery__button"
          onClick={() => setOpen(i)}
          aria-label={`${t('brand.viewPhoto')} ${i + 1} / ${count}`}
        >
          <img
            src={photo.thumb}
            alt={photo.alt[language]}
            width={photo.w}
            height={photo.h}
            loading="lazy"
            decoding="async"
          />
        </button>
        {photo.caption && (
          <figcaption className="brand-gallery__caption">{photo.caption}</figcaption>
        )}
      </figure>
    )
  }

  return (
    <>
      {events.length > 0 && (
        <div className="brand-gallery-group">
          <h3 className="brand-gallery__title" data-reveal>{t('brand.galleryEvents')}</h3>
          <div className="brand-gallery">{events.map(tile)}</div>
        </div>
      )}
      {stories.length > 0 && (
        <div className="brand-gallery-group">
          <h3 className="brand-gallery__title" data-reveal>{t('brand.galleryStories')}</h3>
          <div className="brand-stories">{stories.map(tile)}</div>
        </div>
      )}

      {current && (
        <div
          className="brand-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt[language]}
          onClick={close}
        >
          <button
            type="button"
            ref={closeRef}
            className="brand-lightbox__close"
            onClick={close}
            aria-label={t('brand.close')}
          >
            ×
          </button>
          <button
            type="button"
            className="brand-lightbox__nav brand-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); step(-1) }}
            aria-label={t('brand.previous')}
          >
            ←
          </button>
          <figure className="brand-lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <img
              key={current.id}
              src={current.full}
              alt={current.alt[language]}
              width={current.w}
              height={current.h}
            />
            <figcaption className="brand-lightbox__meta">
              <span>{pad(open + 1)} / {pad(count)}</span>
              {current.caption && <span>{current.caption}</span>}
            </figcaption>
          </figure>
          <button
            type="button"
            className="brand-lightbox__nav brand-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); step(1) }}
            aria-label={t('brand.nextPhoto')}
          >
            →
          </button>
        </div>
      )}
    </>
  )
}

export default BrandGallery
