import { createContext } from 'react'

interface ColorIn {
    background: string
    foreground: string
}

export interface ThemeIn {
    colors: ColorIn
}

export const theme: ThemeIn = {
    colors: {
        background: '#001fff',
        foreground: '#FFFFFF'
    }
}

export const ThemeContext = createContext(theme)