import styles from './LabeledInput.module.css'

export const LabeledInput = ({
                               id,
                               required = false,
                               name,
                               type,
                               value,
                               onChange,
                               labelText,
                               styleLabel,
                               styleInput,
                               styleContainer
                             }) => {
  return (
    <div className={styles.labeledInputContainer} style={styleContainer}>
      <label htmlFor={id} style={styleLabel}>{labelText}</label>
      <input
        required={required}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        style={styleInput}
      />
    </div>
  )
}