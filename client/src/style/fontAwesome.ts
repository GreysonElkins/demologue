import {
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'

const fontAwesomeIconList: IconDefinition[] = [
  faUser
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
