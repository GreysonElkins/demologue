import { useViewer } from 'context/Viewer'

import FileUploader from 'components/Form/FileUploader'
import User from 'types/User'
import Preset from 'types/CloudinaryPresets.d'
import { Icon } from 'style/Icon'

const UserImage: React.FC<{ user: User }> = ({
  user,
}) => {
  const { user: viewer, changeUserPhoto } = useViewer()
  return (
    <FileUploader
      onUpload={changeUserPhoto}
      label={user.photoUrl ? 'Change Photo' : 'Upload a Photo'}
      preset={Preset.USER_IMAGE}
      disabled={(viewer || user) && user?.uid !== viewer?.uid}
      className="UserImage"
    >
      {user.photoUrl ? (
        <img className="avatar" src={user.photoUrl} alt={`${user.displayName}'s photo'`} />
      ) : (
        <div className="avatar placeholder UserImage">
          <Icon icon="user" />
        </div>
      )}
    </FileUploader>
  )
}

export default UserImage
