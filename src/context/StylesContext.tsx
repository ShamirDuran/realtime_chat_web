import React from 'react'
import { useResponsive } from '../hooks'

export const StylesContext = React.createContext({
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
    purple: '',
    accentGreen: '',
  },
  dimensions: {
    profileDrawer: {
      width: 0,
    },
  },
})

export const StylesProvider = ({ children }: { children: JSX.Element }) => {
  const isTabled = useResponsive({ query: 'up', key: 'lg' })

  return (
    <StylesContext.Provider
      value={{
        margin: {
          root: { vertical: 1.5, horizontal: 3.5 },
        },
        fonts: {
          title: {
            weight: 500,
          },
        },
        colors: {
          orange: '#FFA500',
          blue: '#4485E0',
          purple: '#7247DD',
          accentGreen: '#36BBC4',
        },
        dimensions: {
          profileDrawer: {
            width: isTabled ? 520 : 430,
          },
        },
      }}
    >
      {children}
    </StylesContext.Provider>
  )
}
