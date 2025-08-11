import { ipcRenderer } from 'electron'

export default function registerRefreshHandler(refreshKey: string, callback: () => void): () => void {
    const channel = `app-refresh:${refreshKey}`
    const handleRefresh = () => callback()
    ipcRenderer.on(channel, handleRefresh)

    // Return a cleanup function to remove the listener
    return () => {
        ipcRenderer.removeListener(channel, handleRefresh)
    }
}