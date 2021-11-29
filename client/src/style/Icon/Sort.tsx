import { Icon } from '.'

import './index.scss'

type Props = {
  isSortedDesc: boolean
}

const Sort: React.FC<Props> = ({ isSortedDesc }) => {
  const accent = (dir: 'ASC' | 'DSC') => {
    if (typeof isSortedDesc !== 'boolean') return ''
    if (isSortedDesc && dir === 'DSC' || !isSortedDesc && dir === 'ASC') return 'accent'
  }
  return (
    <button className="Sort">
      <Icon icon="sort-up" className={accent('DSC')} />
      <Icon className={`bottom-arrow ${accent('ASC')}`} icon="sort-down" />
    </button>
  )
}

export default Sort