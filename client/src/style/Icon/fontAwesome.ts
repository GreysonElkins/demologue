import {
  faUser,
  faSortUp,
  faSortDown,
  faDrum,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'

const fontAwesomeIconList: IconDefinition[] = [faUser, faSortUp, faSortDown, faDrum, faSave]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
