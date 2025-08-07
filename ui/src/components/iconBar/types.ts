import type { LucideProps } from 'lucide-react'

export interface IconEntry {
    id: string
    label: string
    style?: string
    icon: React.ComponentType<LucideProps>
}

export interface IconBarClickHandlers {
    [iconID: string]: (iconID: string) => void
}


export interface IconBarProps {
    currentActiveId: string
    clickHandlers: IconBarClickHandlers
}