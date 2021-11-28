import { DetailedHTMLProps } from 'react'

// styles provided in index.scss

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  src?: string | null
}

const Avatar: React.FC<Props> = ({ src, className, ...props }) => (
  <button data-ico="👤" className={`Avatar ${className || ''}`} {...props} style={src ? { background: `url(${src})` } : {}}>
    {/* {!src && <Icon icon="user" />} */}
  </button>
)

export default Avatar
