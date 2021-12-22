import { DetailedHTMLProps } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from 'style/Icon'

interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  cta?: 'One' | 'Two' | 'Three' // these should be changed to an additional class i.e. `.Cta.Three`
  collapse?: boolean
  icon?: IconProp
  // icon?: IconProp
}

const Cta: React.FC<Props> = ({
  children,
  className,
  collapse = false,
  cta = 'One',
  icon,
  ...props
}) => (
  // add a class name that's dependent on defined ico and triggers ::after rules?
  <button
    className={`Cta ${cta} ${collapse ? 'collapse' : ''} ${className ? className : ''}`}
    {...props}
  >
    {children}
    {icon && <Icon icon={icon} id="CtaIcon"/>}
  </button>
)

export default Cta
