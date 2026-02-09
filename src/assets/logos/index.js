
// Holdings logos - add your actual logo files here
// Example: import holding1Logo from './holding1.png'
import logohgroup from './logoprincipalh-negro.png'
import herologo from './HEROlogo_negro.png'
import hacklogo from './HACKlogo_negro.png'
import halologo from './HALOlogo_negro.png'
import herelogo from './HERElogo_negro.png'
import hitslogo from './HITSlogo_negro.png'
import homelogo from './HOMElogo_negro.png'
import hopelogo from './HOPElogo_negro.png'
import hugelogo from './HUGElogo_negro.png'
import huntlogo from './HUNTlogo_negro.png'
import hypelogo from './HYPElogo_negro.png'
import hooklogo from './HOOKlogo_negro.png'
// import holding4Logo from './holding4.png'
// import holding5Logo from './holding5.png'

// Export individual logos
export {
  logohgroup,
  herologo,
  hacklogo,
  halologo,
  herelogo,
  hitslogo,
  homelogo,
  hopelogo,
  hugelogo,
  huntlogo,
  hypelogo,
  hooklogo
}

// Export holdings as an array for easy mapping
export const holdingsLogos = [
  {
    id: 'hero',
    name: 'HERO',
    logo: herologo,
    alt: 'HERO'
  },
  {
    id: 'hack',
    name: 'HACK',
    logo: hacklogo,
    alt: 'HACK'
  },
  {
    id: 'halo',
    name: 'HALO',
    logo: halologo,
    alt: 'HALO'
  },
  {
    id: 'here',
    name: 'HERE',
    logo: herelogo,
    alt: 'HERE'
  },
  {
    id: 'hits',
    name: 'HITS',
    logo: hitslogo,
    alt: 'HITS'
  },
   {
    id: 'home',
    name: 'HOME',
    logo: homelogo,
    alt: 'HOME'
  },
   {
    id: 'hope',
    name: 'HOPE',
    logo: hopelogo,
    alt: 'HOPE'
  },
  /*
   {
    id: 'huge',
    name: 'HUGE',
    logo: hugelogo,
    alt: 'HUGE'
  },*/
  
  {
    id: 'hunt',
    name: 'HUNT',
    logo: huntlogo,
    alt: 'HUNT'
  },
  {
    id: 'hype',
    name: 'HYPE',
    logo: hypelogo,
    alt: 'HYPE'
  },
  {
    id: 'hook',
    name: 'HOOK',
    logo: hooklogo,
    alt: 'HOOK'
  }
]

// Export all logos as default
export default {
  holdings: {
    herologo,
    hacklogo,
    halologo,
    herelogo,
    hitslogo,
    homelogo,
    hopelogo,
    hugelogo,
    huntlogo,
    hypelogo,
    hooklogo
  },
  holdingsLogos,
  company: {
   logohgroup,
   herologo,
   hacklogo,
   halologo,
   herelogo,
   hitslogo,
   homelogo,
   hopelogo,
   hugelogo,
   huntlogo,
   hypelogo,
   hooklogo
  }
}