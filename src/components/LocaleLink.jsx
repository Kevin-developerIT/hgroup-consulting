import { Link } from 'react-router-dom'
import { useLocalePath } from '../contexts/useLanguage'

/* <Link> that takes the Spanish path and points to the current
   language's version: <LocaleLink to="/contact"> → /en/contact in EN. */
function LocaleLink({ to, ...props }) {
  const localize = useLocalePath()
  return <Link to={localize(to)} {...props} />
}

export default LocaleLink
