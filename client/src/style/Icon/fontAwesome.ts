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
  faLayerGroup
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
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
