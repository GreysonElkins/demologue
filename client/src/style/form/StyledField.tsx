import { ChangeEvent } from 'react'
import { Field, FieldAttributes, ErrorMessage, useFormikContext } from 'formik'

import './index.scss'

export const printDropdownOptions = (
  options: Array<{ text: string; value: any }>,
) =>
  options.map(({ text, value }, i) => (
    <option key={`option-${i}:${text}`} value={value}>
      {text}
    </option>
  ))

const StyledField: React.FC<FieldAttributes<any>> = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext()

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget?.files) return
    setFieldValue(props.name, event.currentTarget.files[0])
  }

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
        {props.type !== "file" ? (
          <Field className={className()} { ...props } /> 
        ) : (
          <input className={className()} { ...props } onChange={handleFile} />
        )}
      </div>
      <div className="ErrorWrapper">
        <ErrorMessage name={props.name || ''} component="span" />
      </div>
    </div>
  )
}

export default StyledField
