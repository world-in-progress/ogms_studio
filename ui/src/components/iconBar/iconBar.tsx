import { Combine, Globe2, Grid3X3, Languages, Settings, User } from "lucide-react"
import type { IconBarProps, IconEntry } from "./types"
import { cn } from "@/utils/utils"

export const ICON_REGISTRY: IconEntry[] = [
    { id: 'grid-editor', icon: Grid3X3, label: 'Grid Editor' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'map-studio', icon: Globe2, label: 'Map Studio' },
    { id: 'languages', icon: Languages, label: 'Languages', style: 'mt-auto' },
    { id: 'user', icon: User, label: 'User', style: '!border-blue-500' }
]

export default function IconBar({
    currentActiveId,
    clickHandlers
}: IconBarProps) {
    return (
        <div className='w-12 h-full bg-[#333333] flex flex-col items-center py-2'>
            {ICON_REGISTRY.map(item => (
                <button
                    type='button'
                    id={item.id}
                    key={item.id}
                    title={item.label}
                    onClick={() => clickHandlers[item.id](item.id)}
                    className={
                        cn(
                            'w-10 h-10 mb-1 cursor-pointer flex items-center justify-center', // default styles
                            item.style && item.style,
                            currentActiveId === item.id && 'border-r-2 border-gray-200',
                        )
                    }
                >
                    <item.icon className={cn(
                        'w-5 h-5',
                        currentActiveId === item.id ? 'text-gray-200' : 'text-gray-400 hover:text-gray-200',
                    )} />
                </button>
            ))}
        </div>
    )
}
