import CtaOne from 'style/button/CtaOne'

import './DropdownCta.scss'

// type Props = {
//   text?: string
//   triggerProps?: React.DetailedHTMLProps<
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   >
// }

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text?: string
  triggerClass?: string
}

const DropdownCta: React.FC<Props> = ({ children, text, triggerClass, ...props }) => {
  return (
    <div className="DropdownCta">
      <CtaOne className={`${triggerClass || ""}`} {...props}>
        {text && text}
      </CtaOne>
      <nav className={`dropdown`}>{children}</nav>
    </div>
  )
}

export default DropdownCta
