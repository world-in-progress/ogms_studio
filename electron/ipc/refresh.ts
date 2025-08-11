import { ipcRenderer } from 'electron'

export default function registerRefreshHandler(callback: () => void): () => void {
    const handleRefrensh = () => callback()
    ipcRenderer.on('app-refresh', handleRefrensh)
    
    // Return a cleanup function to remove the listener
    return () => {
        ipcRenderer.removeListener('app-refresh', handleRefrensh)
    }
}