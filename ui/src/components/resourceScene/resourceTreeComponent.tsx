import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from 'react-i18next'

import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import { cn } from '@/utils/utils'
import { ChevronDown, ChevronRight, CloudCheck, CloudDownload, FilePlus2, FileText, Folder, FolderOpen, FolderPlus } from 'lucide-react'
import { Button } from '../ui/button'

export const NodeRenderer = () => {

    const { t } = useTranslation("resourceScene");

    const nodeRef = useRef<HTMLDivElement>(null)
    const [isDownloaded, setIsDownloaded] = useState(false)
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)


    const handleClickPublicDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsDownloaded(true)
    }


    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        ref={nodeRef}
                        className={cn(
                            'flex items-center py-0.5 px-2 hover:bg-gray-700 cursor-pointer text-sm w-full select-none',
                            // isSelected ? 'bg-gray-600 text-white' : 'text-gray-300',
                            // !isFolder && 'cursor-grab active:cursor-grabbing',
                        )}
                    // style={{ paddingLeft: `${depth * 16 + 2}px` }}
                    // onClick={handleClick}
                    // onDoubleClick={handleDoubleClick}
                    // draggable={!isFolder}
                    // onDragStart={(e) => {
                    //     if (!isFolder) {
                    //         e.dataTransfer.setData('text/plain', node.key);
                    //         e.dataTransfer.effectAllowed = 'copy';
                    //     }
                    // }}
                    >
                        {/* {isFolder ? (
                            <>
                                {isExpanded ? (
                                    <ChevronDown className='w-4 h-4 mr-1' />
                                ) : (
                                    <ChevronRight className='w-4 h-4 mr-1' />
                                )}
                                {isExpanded ? (
                                    <FolderOpen className='w-4 h-4 mr-2 text-blue-400' />
                                ) : (
                                    <Folder className='w-4 h-4 mr-2 text-blue-400' />
                                )}
                            </>
                        ) : (
                            <FileText className='w-4 h-4 mr-2 ml-3 text-gray-400' />
                        )} */}
                        {/* <span>{node.name}</span>
                        {!isFolder && tree.isPublic &&
                            <button
                                type='button'
                                className={`flex rounded-md w-6 h-6 ${!isDownloaded && 'hover:bg-gray-500'} items-center justify-center mr-4 ml-auto cursor-pointer`}
                                title={t('download')}
                                onClick={handleClickPublicDownload}
                            >
                                {isDownloaded ? <CloudCheck className='w-4 h-4 text-green-500' /> : <CloudDownload className='w-4 h-4 text-white' />}
                            </button>} */}
                    </div>
                </ContextMenuTrigger>
                {/* {renderNodeMenu()} */}
            </ContextMenu>

            {/* Render child nodes */}
            {/* {isFolder && isExpanded && node.children && (
                <div>
                    {Array.from(node.children.values()).map(childNode => (
                        <NodeRenderer
                            key={childNode.id}
                            node={childNode}
                            privateTree={privateTree}
                            publicTree={publicTree}
                            depth={depth + 1}
                            triggerFocus={triggerFocus}
                        />
                    ))}
                </div>
            )} */}
        </div>
    )
}

const TreeRenderer = () => {
    const { t } = useTranslation("resourceScene");
    const [showButtons, setShowButtons] = useState(false);

    return (
        <>
            <div
                className='z-10 bg-[#2A2C33] py-1 justify-between flex items-center text-sm font-semibold text-gray-200'
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
            >
                <span className='ml-2'>title</span>
                {showButtons && (
                    <div className='flex items-center gap-2 mr-2'>
                        <button
                            title='Create File'
                            type='button'
                            className='p-0.5 hover:bg-[#676767] rounded-sm'
                        // onClick={openUntitledPage}
                        >
                            <FilePlus2 className='h-4 w-4 cursor-pointer hover:text-white' />
                        </button>
                        <button
                            title='Create Folder'
                            type='button'
                            className='p-0.5 hover:bg-[#676767] rounded-sm'
                        >
                            <FolderPlus className='h-4 w-4 cursor-pointer hover:text-white' />
                        </button>
                    </div>
                )}
            </div>
            <NodeRenderer/>
        </>
    )
}

export default function ResourceTreeComponent() {

    const { t } = useTranslation("resourceScene")

    const [, triggerRepaint] = useReducer(x => x + 1, 0)


    return (
        <div className='h-full overflow-auto bg-[#252526] ' >
            <div className='text-sm font-semibold text-gray-400 py-2 ml-2 uppercase tracking-wide'>
                {t('EXPLORER')}
            </div>
            <TreeRenderer />
            <Separator className='my-2 bg-[#474747] w-full h-[1px]' />
            <TreeRenderer />
        </div>
    )
}
