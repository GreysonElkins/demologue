import { useState, FocusEvent } from 'react'
import CtaOne from 'style/button/Cta'

import './DropdownCta.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string
  triggerClass?: string
  altTrigger?: JSX.Element
}

const DropdownCta: React.FC<Props> = ({ children, text, triggerClass, altTrigger, ...props }) => {
  const [override, setOverride] = useState<boolean>(false)

  const overrideHiddenMenu = () => override ? ' override-hide' : ''

  const handleTab = (event: FocusEvent<HTMLDivElement, Element>) => {
    event.relatedTarget ? setOverride(true) : setOverride(false)
  }

  return (
    <div
      className="DropdownCta"
      tabIndex={0}
      onFocus={handleTab}
      onBlur={handleTab}
    >
      {altTrigger ? (
        altTrigger
      ) : (
        <CtaOne className={`trigger ${triggerClass || ''}`} {...props}>
          {text && text}
        </CtaOne>
      )}
      <div className={`dropdown ${overrideHiddenMenu()}`}>{children}</div>
    </div>
  )
}

export default DropdownCta
