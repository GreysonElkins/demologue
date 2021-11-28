import { DetailedHTMLProps } from 'react'

const CtaOne: React.FC<
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button className={`${className || 'CtaOne'}`} {...props}>
    {children}
  </button>
)

export default CtaOne
