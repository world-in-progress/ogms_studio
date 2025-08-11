import path from 'path'
import { Menu, BrowserWindow } from 'electron'

let apiDocsWindow: BrowserWindow | null = null

function createApiDocsWindow() {
    if (apiDocsWindow) {
        apiDocsWindow.focus()
        return
    }

    apiDocsWindow = new BrowserWindow({
		width: 1200,
		height: 800,
        title: 'API Documentation',
		fullscreen: true, // fullscreen as default
		autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        show: false
    })

    apiDocsWindow.loadURL('http://127.0.0.1:8000/docs')
    apiDocsWindow.once('ready-to-show', () => {
        apiDocsWindow?.show()
    })

    apiDocsWindow.on('closed', () => {
        apiDocsWindow = null
    })

    apiDocsWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load API docs:', errorDescription)
        if (apiDocsWindow) {
            apiDocsWindow.loadFile(path.join(__dirname, '../templates/api-error.html'))
        }
    })
}

export default function createMenu() {
    const isMac = process.platform === 'darwin'
    
    const template: Electron.MenuItemConstructorOptions[] = [
        ...(isMac ? [{
            role: 'appMenu' as const,
            submenu: [
                { role: 'about' as const },
                {
                    label: 'API Documentation',
                    accelerator: 'CmdOrCtrl+Shift+A',
                    click: () => {
                        createApiDocsWindow()
                    }
                },
                { type: 'separator' as const },
                { role: 'services' as const },
                { type: 'separator' as const },
                { role: 'hide' as const },
                { role: 'hideOthers' as const },
                { role: 'unhide' as const },
                { type: 'separator' as const },
                { role: 'quit' as const }
            ]
        }]
        : [{
            label: 'tools',
            submenu: [
                {
                    label: 'API Documentation',
                    accelerator: 'CmdOrCtrl+Shift+A',
                    click: () => {
                        createApiDocsWindow()
                    }
                },
                { type: 'separator' as const },
                { role: 'quit' as const }
            ]
        }]),
        {
            role: 'viewMenu' as const
        },
        {
            role: 'windowMenu' as const
        }
    ]
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}