import { Field, FieldAttributes, ErrorMessage } from 'formik'

import './index.scss'

export const printDropdownOptions = (options: Array<{text: string, value: any}>) => options.map(({ text, value }, i) => (
  <option key={`option-${i}:${text}`} value={value}>{text}</option>
))

const StyledField: React.FC<FieldAttributes<any>> = ({ label, ...props }) => {
  const className = () => {
    switch(props.as) {
      default: return 'LineText'
  }}
  return (
    <div className="StyledField">
      {label && (
        <label className="Label" htmlFor={props.name}>
          {label}
          {props.required && <span>{"*"}</span>}
        </label>
      )}
      <div>
      <Field className={className()} {...props} />
      </div>
      <div className="ErrorWrapper">
        <ErrorMessage name={props.name || ''} component="span" />
      </div>
    </div>
  )
}

export default StyledField
