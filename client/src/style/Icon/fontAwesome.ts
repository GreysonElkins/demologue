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
  faSpinner,
  faLayerGroup,
  faPlay,
  faPause
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
  faSpinner,
  faLayerGroup,
  faPlay,
  faPause,
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
