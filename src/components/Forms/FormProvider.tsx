import { FormProvider as Form } from 'react-hook-form'

interface Props {
  children: React.ReactNode
  methods: any
  onSubmit: () => void
}

export const FormProvider = ({ children, onSubmit, methods }: Props) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  )
}
