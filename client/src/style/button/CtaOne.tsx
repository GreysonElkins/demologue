import { DetailedHTMLProps } from 'react'

// class provided by index.scss
// className should be a prop typed 'one' | 'two' | 'three', etc, 
// as those cta's are built. 
// only one Cta component will exist

const CtaOne: React.FC<
  DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button className={`${className || 'CtaOne'}`} {...props}>
    {children}
  </button>
)

export default CtaOne
