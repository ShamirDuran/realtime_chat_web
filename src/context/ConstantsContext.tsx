import React from 'react'

export const ConstantsContext = React.createContext({
  margin: {
    root: {
      vertical: 0,
      horizontal: 0,
    },
  },
})

export const ConstantsProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ConstantsContext.Provider
      value={{ margin: { root: { vertical: 2, horizontal: 3.5 } } }}
    >
      {children}
    </ConstantsContext.Provider>
  )
}
