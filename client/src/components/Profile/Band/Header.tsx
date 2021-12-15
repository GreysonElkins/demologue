import { useMemo } from 'react'
import { useBands } from 'context/Bands'
import useModal from 'hooks/useModal'

import JoinBand from 'components/Modal/JoinBand'
import BandImage from './BandImage'
import Band from "types/Band"
import UserAvatar from 'style/Icon/UserAvatar'
import { Icon } from 'style/Icon'

const NumberStat = (value: string | number | JSX.Element, title: string, onClick?: () => void) => (
  <div 
    className={`number-stat ${onClick ? 'clickable' : ''}`} 
    onClick={onClick} 
    role={onClick ? 'button' : ''}
  >
    <span>{value}</span>
    {title}
  </div>
)

const BandHeader: React.FC<{band: Band}> = ({ band }) => {
  const memberIds = useMemo(() => Object.keys(band.members), [JSON.stringify(band)])
  const { isOpen, toggle } = useModal()
  const { changeBandPhoto } = useBands()

  const printMembers = memberIds.reduce((avatars, id) => {
    if (band.members[id] === "MEMBER") 
      avatars.push(
        <UserAvatar userId={id} hideLabel key={`user-avatar-${id}`} />
      )
    return avatars
  }, [] as JSX.Element[])

  return (
    <>
      <JoinBand selectedBand={band.id} toggle={toggle} isOpen={isOpen} />
      <section className="header">
        <BandImage band={band} onUpload={(url: string) => changeBandPhoto(band.id, url)} />
        <div className="band info">
          <div className="top-line">
            <h3>{band.name}</h3>
            <div className="band-members">
              {printMembers}
            </div>
          </div>
            <div className="band-stats">
              {NumberStat(band.songList.tracks.length, 'tracks')}
              {NumberStat(Object.values(band.members).filter(role => role === "MEMBER").length, 'members')}
              {NumberStat(<Icon icon="sign-in-alt" />, 'join', toggle)}
              {NumberStat(<Icon icon="envelope" />, 'contact')}
            </div>
        </div>
      </section>
    </>
  )}


export default BandHeader
