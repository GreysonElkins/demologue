import { Formik, Form } from 'formik'
import { useMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
// import * as yup from 'yup'
import { printDropdownOptions } from 'style/form/StyledField'
import useViewerBands from 'hooks/useViewerBands'
import { createTrack } from 'scripts/api/demologue/mutation/track'
import { uploadFile as cloudinary } from 'scripts/api/cloudinary'

import StyledField from 'style/form/StyledField'
import Loading from 'style/Icon/Loading'
import Cta from 'style/button/Cta'

import './index.scss'
// import useUploader from 'hooks/useUploader'
import Preset from 'types/CloudinaryPresets.d'

type FormValues = {
  file: File
  bandId: number
  title?: string
  workingTitle?: string
}

const CreateTrack: React.FC = () => {
  const { bands, viewer } = useViewerBands()
  const match = useMatch('/band/:bandId')
  const { mutate: saveTrack } = createTrack()
  // const { uploadFile } = useUploader({ preset: Preset.AUDIO })
  if (!bands || !viewer) return <Loading />

  const options = printDropdownOptions(bands.map(({ id, name }) => ({ text: name, value: id })))

  // const validationSchema = yup.object().shape({
  //   // file: yup.mixed().required('Required'),
  //   ownedBy: yup.number().required('Required'),
  // })

  const onSubmit = async (values: FormValues) => {
    try {
      const { file, ...input } = values
      const url = await cloudinary(file, Preset.AUDIO)
      if (!url) return console.error("Something went wrong getting the url on upload")
      saveTrack({ userId: viewer.uid, url, ...input })
    } catch (error) {
      toast.error("Something went wrong uploading your track, please try again")
      console.error(error)
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
      initialValues={{
        file: '' as unknown as File,
        bandId: match ? Number(match.params.bandId) : bands[0].id,
        title:  '',
        workingTitle: '',
      }}
    >
      <Form className="StyledForm">
        <StyledField
          name="file"
          placeholder="Your awesome music"
          label="Upload an audio file"
          tabIndex={1}
          type="file"
          accept=".mp3"
          required
        />
        <StyledField
          name="bandId"
          as="select"
          label="Which band recorded this track?"
          tabIndex={1}
          style={{ textTransform: "capitalize" }}
          required
        >
          {options}
        </StyledField>
        <StyledField
          name="title"
          placeholder="Never Gonna Give You Up"
          label="Enter your track's name, if it has one:"
          tabIndex={1}
        />
        <StyledField
          name="workingTitle"
          label="Enter your track's working title, if it has one:"
          placeholder="Five"
          tabIndex={1}
        />
        <Cta type="submit" tabIndex={1}>Upload</Cta>
        {/* <FileUploader /> */}
      </Form>
    </Formik>
  )
}

export default CreateTrack
