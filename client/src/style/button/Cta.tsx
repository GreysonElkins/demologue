import { DetailedHTMLProps } from 'react'
// import { IconProp } from '@fortawesome/fontawesome-svg-core'
// import { Icon } from 'style/Icon'

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  Cta?: 'One'
  // icon?: IconProp
}

const CtaOne: React.FC<Props> = ({ children, className, Cta = 'One', ...props }) => (
  <button className={`${className || `Cta${Cta}`}`} {...props}>
    {children} 
    {/* {icon && <Icon icon={icon} />} */}
  </button>
)

export default CtaOne
