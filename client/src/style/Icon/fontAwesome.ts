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
  faPause,
  // for track actions
  faLowVision,
  faCommentAlt,
  faPlusSquare,
  faEye
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
  faLowVision,
  faCommentAlt,
  faPlusSquare,
  faEye,
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
