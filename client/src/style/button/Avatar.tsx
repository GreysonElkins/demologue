import { DetailedHTMLProps } from 'react'
import Icon from 'style/Icon'

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  src?: string | null
}

const Avatar: React.FC<Props> = ({ src, className, ...props }) => (
  <button className={`Avatar ${className || ''}`} {...props} style={src ? { background: `url(${src})` } : {}}>
    {!src && <Icon icon="user" />}
  </button>
)

export default Avatar
