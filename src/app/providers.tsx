// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    "brand": {
      "100": "#DCE8FD",
      "200": "#BAD0FB",
      "300": "#95B3F5",
      "400": "#7899EB",
      "500": "#4E73DF",
      "600": "#3957BF",
      "700": "#273FA0",
      "800": "#182B81",
      "900": "#0E1C6B"
    }    
  },
})


export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}