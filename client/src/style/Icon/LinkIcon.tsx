import { NavLink } from 'react-router-dom'

import { Icon } from 'style/Icon'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface Props extends FontAwesomeIconProps {
  title?: string
  to: string
  tabIndex?: number
}

const LinkIcon: React.FC<Props> = ({ to, title, tabIndex = 0, ...props }) => {
  return (
    <NavLink tabIndex={tabIndex} to={to} className={({ isActive }) => `LinkIcon${isActive ? ' active' : ''}`}>
      <Icon {...props} />
      {title && <div className="title">{title}</div>}
    </NavLink>
  )
}

export default LinkIcon
