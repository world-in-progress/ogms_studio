export {}

// Declare the global window.electronAPI object for Electron renderer
declare global {
    type Cleanup = () => void
    interface Window {
        electronAPI?: {
            openFileDialog: () => Promise<string | null>,
            openTiffFileDialog: () => Promise<string | null>,
            openTxtFileDialog: () => Promise<string | null>,
            openInpFileDialog: () => Promise<string | null>,
            openCsvFileDialog: () => Promise<string | null>,
            onRefresh: (callback: () => void) => Cleanup
        }
    }
}