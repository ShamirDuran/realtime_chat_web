import { useState } from 'react'

export const useForm = (initialValues: any = {}) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return [values, handleChange]
}
