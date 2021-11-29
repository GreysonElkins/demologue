import { DetailedHTMLProps } from 'react'
// import { IconProp } from '@fortawesome/fontawesome-svg-core'
// import { Icon } from 'style/Icon'

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  cta?: 'One' | 'Two'
  ico?: string
  // icon?: IconProp
}

const Cta: React.FC<Props> = ({ children, className, cta = 'One', ico = "", ...props }) => (
  // add a class name that's dependent on defined ico and triggers ::after rules?
  <button className={`${className || `Cta${cta}`}`} {...props} data-ico={ico}> 
    {children} 
    {/* {icon && <Icon icon={icon} />} */}
  </button>
)

export default Cta
