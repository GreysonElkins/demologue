import {
  faUser,
  faSortUp,
  faSortDown,
  faDrum,
  faSave,
  faHome,
  faHeadphones
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
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
