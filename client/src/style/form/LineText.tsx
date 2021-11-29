import { Field, FieldAttributes, ErrorMessage } from 'formik'

import './index.scss'

const LineText: React.FC<FieldAttributes<any>> = ({ label, ...props }) => (
  <div className="LineText">
    {label && (
      <label className="Label" htmlFor={props.name}>
        {label}
        {props.required && <span>*</span>}
      </label>
    )}
    <div>
    <Field {...props} />
    </div>
    <div className="ErrorWrapper">
      <ErrorMessage name={props.name} component="span" />
    </div>
  </div>
)

export default LineText
