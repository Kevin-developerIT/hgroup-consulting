/* Web versions of the originals in assets/mp4: H.264 (plays in every
   browser — the HALO original was AV1), no audio track, max 1920px,
   faststart so playback begins before the file finishes downloading. */
import heroVideo from '../../assets/video/hero.mp4'
import hackVideo from '../../assets/video/hack.mp4'
import haloVideo from '../../assets/video/halo.mp4'
import hereVideo from '../../assets/video/here.mp4'
import hitsVideo from '../../assets/video/hits.mp4'
import hopeVideo from '../../assets/video/hope.mp4'
import huntVideo from '../../assets/video/hunt.mp4'
import hypeVideo from '../../assets/video/hype.mp4'
import hookVideo from '../../assets/video/hook.mp4'

import holy1 from '../../assets/holy/holy1.jpeg'
import holy2 from '../../assets/holy/holy2.jpeg'
import holy3 from '../../assets/holy/holy3.jpeg'
import holy4 from '../../assets/holy/holy4.jpeg'
import holy5 from '../../assets/holy/holy5.jpeg'
import holy6 from '../../assets/holy/holy6.jpeg'
import holy7 from '../../assets/holy/holy7.jpeg'

import home1 from '../../assets/home/home1.mp4'
import home2 from '../../assets/home/home2.mp4'
import home3 from '../../assets/home/home3.mp4'
import home4 from '../../assets/home/home4.mp4'
import home5 from '../../assets/home/home5.mp4'
import home6 from '../../assets/home/home6.mp4'
import home7 from '../../assets/home/home7.mp4'
import home8 from '../../assets/home/home8.mp4'

/* Background media for each H — shared by the home accordion and the
   brand pages so both always show the same footage. HOME and HOLY use
   a slideshow instead of a single clip (see HMedia.jsx). */
export const H_VIDEOS = {
  hero: heroVideo,
  hack: hackVideo,
  halo: haloVideo,
  here: hereVideo,
  hits: hitsVideo,
  hope: hopeVideo,
  hunt: huntVideo,
  hype: hypeVideo,
  hook: hookVideo,
}

export const HOLY_IMAGES = [holy1, holy2, holy3, holy4, holy5, holy6, holy7]
export const HOME_VIDEOS = [home1, home2, home3, home4, home5, home6, home7, home8]
