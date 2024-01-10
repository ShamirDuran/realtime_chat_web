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
    subtitle: {
      fontSize: 0,
    },
  },
  colors: {
    orange: '',
    purple: '',
    accentGreen: '',
  },
  dimensions: {
    profileDrawer: {
      width: '',
    },
  },
})

export const StylesProvider = ({ children }: { children: JSX.Element }) => {
  const isMobile = useResponsive({ query: 'down', key: 'sm' })
  const isTabled = useResponsive({ query: 'down', key: 'lg' })

  return (
    <StylesContext.Provider
      value={{
        margin: {
          root: {
            vertical: 1.5,
            horizontal: isMobile ? 1.3 : isTabled ? 2.3 : 3.5,
          },
        },
        fonts: {
          title: {
            weight: 500,
          },
          subtitle: {
            fontSize: isMobile ? 11 : isTabled ? 12 : 13,
          },
        },
        colors: {
          orange: '#FFA500',
          purple: '#7247DD',
          accentGreen: '#36BBC4',
        },
        dimensions: {
          profileDrawer: {
            // mobile - tabled - desktop
            width: isMobile ? '100vw' : isTabled ? '420px' : '520px',
          },
        },
      }}
    >
      {children}
    </StylesContext.Provider>
  )
}
