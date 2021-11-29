import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { DetailedHTMLProps } from 'react'
import { Icon } from 'style/Icon'

import './index.scss'

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  src?: string | null
  defaultIcon?: IconProp
  size?: SizeProp
}

const Avatar: React.FC<Props> = ({ src, defaultIcon, className, size, ...props }) => (
  <button className={`Avatar ${className || ''}`} {...props}>
    {src && <img src={src} alt="" />}
    {!src && <Icon icon={ defaultIcon || "user" } size={ size || "1x"} />}
  </button>
)

export default Avatar
