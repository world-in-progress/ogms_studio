import { contextBridge, ipcRenderer } from 'electron'
import registerRefreshHandler from './ipc/refresh'

contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
    openTiffFileDialog: () => ipcRenderer.invoke('dialog:openTiffFile'),
    openTxtFileDialog: () => ipcRenderer.invoke('dialog:openTxtFile'),
    openInpFileDialog: () => ipcRenderer.invoke('dialog:openInpFile'),
    openCsvFileDialog: () => ipcRenderer.invoke('dialog:openCsvFile'),
    onRefresh: (refreshKey: string, callback: () => void) => registerRefreshHandler(refreshKey, callback)
})

console.log('Preload script loaded.')
