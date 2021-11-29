import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { DetailedHTMLProps } from 'react'
import { Icon } from 'style/Icon'

import './index.scss'

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  src?: string | null
  defaultIcon?: IconProp
  size?: SizeProp
  noAction?: boolean
}

const Avatar: React.FC<Props> = ({ src, defaultIcon, className, size, noAction, ...props }) => (
  <button className={`Avatar ${className || ''}`} {...props} tabIndex={noAction ? -1 : 0}>
    {src && <img src={src} alt="" />}
    {!src && <Icon icon={ defaultIcon || "user" } size={ size || "1x"} />}
  </button>
)

export default Avatar
