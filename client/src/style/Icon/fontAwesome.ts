import {
  faUser,
  faSortUp,
  faSortDown,
  faDrum,
  faSave,
  faHome,
  faHeadphones,
  faEnvelope,
  faEnvelopeOpenText,
  faSignInAlt,
  faSpinner,
  faLayerGroup,
  faPlay,
  faPause,
  // for track actions
  faLowVision,
  faCommentAlt,
  faPlusSquare,
  faEye,
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faTimesCircle
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
  faEnvelopeOpenText,
  faSignInAlt,
  faSpinner,
  faLayerGroup,
  faPlay,
  faPause,
  faLowVision,
  faCommentAlt,
  faPlusSquare,
  faEye,
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
  faTimesCircle,
]

export const initFontAwesome = () => library.add(...fontAwesomeIconList)
