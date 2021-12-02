import {
  faUser,
  faSortUp,
  faSortDown,
  faDrum,
  faSave,
  faHome,
  faHeadphones,
  faEnvelope,
  faSignInAlt,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'

const fontAwesomeIconList: IconDefinition[] = [
  faUser,
  faSortUp,
  faSortDown,
  faDrum,
  faSave,
  faHome,
  faHeadphones,
  faEnvelope,
  faSignInAlt,
  faSpinner
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
