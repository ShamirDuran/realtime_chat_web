import React from 'react'

export const ConstantsContext = React.createContext({
  margin: {
    root: {
      vertical: 0,
      horizontal: 0,
    },
  },
  fonts: {
    title: {
      weight: 0,
    },
  },
  colors: {
    orange: '',
    blue: '',
    accentGreen: '',
  },
})

export const ConstantsProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ConstantsContext.Provider
      value={{
        margin: {
          root: { vertical: 2, horizontal: 3.5 },
        },
        fonts: {
          title: {
            weight: 500,
          },
        },
        colors: {
          orange: '#FFA500',
          blue: '#7247DD',
          accentGreen: '#7247DD',
        },
      }}
    >
      {children}
    </ConstantsContext.Provider>
  )
}
