import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn } from '@/utils/utils'
import { Cloudy, FileText, User, X } from 'lucide-react'
import React, { useEffect, useReducer, useRef } from 'react'
import { TabBarProps, Tab, renderNodeTabProps } from './types'
import { DragDropContext, Droppable, Draggable, DragStart } from '@hello-pangea/dnd'


const getTabContextMenu = (tab: Tab) => (
    <ContextMenuContent className='bg-white border-gray-50'>
        <ContextMenuItem>复制路径</ContextMenuItem>
        <ContextMenuItem>在文件管理器中显示</ContextMenuItem>
        <ContextMenuItem>重命名</ContextMenuItem>
        <ContextMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
            删除
        </ContextMenuItem>
    </ContextMenuContent>
)

// const RenderNodeTab: React.FC<renderNodeTabProps> = ({
//     focusNode,
//     node,
//     index,
//     onTabClick,
// }: renderNodeTabProps) => {
//     const tab = node.tab
//     const tabId = node.id
//     const isFocused = focusNode && focusNode.id === node.id

//     return (
//         <Draggable key={tabId} draggableId={tabId} index={index}>
//             {(providedDraggable, snapshot) => (
//                 <div
//                     onClick={() => {
//                         onTabClick(tab)
//                     }}
//                     ref={providedDraggable.innerRef}
//                     {...providedDraggable.draggableProps}
//                     {...providedDraggable.dragHandleProps}
//                     tab-id={node.id}
//                 >
//                     <ContextMenu>
//                         <ContextMenuTrigger asChild>
//                             <div
//                                 title={`${node.key} · ${node.tree.isPublic ? 'PUBLIC' : 'PRIVATE'}`}
//                                 className={cn(
//                                     'group flex items-center px-4 bg-[#2D2D2D] border-r border-[#252526] cursor-pointer h-[4vh]',
//                                     isFocused && 'bg-[#1E1E1E]',
//                                     snapshot.isDragging && 'bg-gray-600'
//                                 )}
//                             >
//                                 {tab.name === "user" ? (
//                                     <User className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400" />
//                                 ) : (
//                                     <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-blue-400" />
//                                 )}
//                                 <span
//                                     className={cn(
//                                         "text-sm truncate text-gray-300 px-0.5 flex items-center",
//                                         tab.isPreview && "italic"
//                                     )}
//                                 >
//                                     {tab.name}
//                                     {node.tree.isPublic && <Cloudy className='w-4 h-4 ml-2 text-gray-300' />}
//                                 </span>

//                                 <X
//                                     className={cn(
//                                         'w-4 h-4 ml-2',
//                                         isFocused
//                                             ? 'text-white hover:text-amber-400'
//                                             : 'text-gray-500 hover:text-white invisible group-hover:visible'
//                                     )}
//                                     onClick={(e) => {
//                                         e.stopPropagation()
//                                         node.tree.stopEditingNode(node)
//                                     }}
//                                 />
//                             </div>
//                         </ContextMenuTrigger>
//                     </ContextMenu>
//                 </div>
//             )}
//         </Draggable>
//     )
// }

// const RenderNodeTabs: React.FC<{ tabs: Tab[], onTabClick: (tab: Tab) => void, triggerFocus: number }> = ({
//     focusNode,
//     tabs,
//     onTabClick,
//     triggerFocus
// }) => {
//     const elements = tabs.map((tab, index) => {
//         const node = tab.node

//         return RenderNodeTab({
//             focusNode,
//             index,
//             onTabClick,
//             triggerFocus
//         })
//     })

//     return <>{elements}</>
// }

export default function TabBar({
    width,
}: TabBarProps) {
    const [, triggerRepaint] = useReducer(x => x + 1, 0)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    return (
        <div
            className='bg-[#252526] flex shrink-0 w-full h-[4vh]'
            // style={{ width: width ? `${width}px` : '[84.5%]' }}
        >
            {/* <div ref={scrollAreaRef} className='w-full h-full overflow-x-auto'>
                <DragDropContext>
                    <Droppable droppableId='tabs' direction='horizontal'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className='flex'
                            >
                                <RenderNodeTabs focusNode={focusNode} tabs={tabs} onTabClick={onTabClick} triggerFocus={triggerFocus} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext> */}
                {/* <ScrollBar orientation='horizontal' /> */}
            {/* </div> */}
        </div>
    )
}
