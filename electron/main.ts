import path from 'path'
import { Server } from 'http'
import { app, BrowserWindow, screen } from 'electron'

import createMenu from './menu'
import { startLdle, stopLdle } from './noodle'
import { startLdleMessagePipe, stopLdleMessagePipe } from './ipc/ldle/messagePipe'

let ldleMessagePipe: Server | null = null

async function createWindow(): Promise<void> {
    // Create the main application window
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		fullscreen: true, // fullscreen as default
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
		},
	})

    // Start local Noodle (Ldle) and message pipe between main process and Ldle
    ldleMessagePipe = await startLdleMessagePipe(3001, mainWindow)
    await startLdle()

	// const startUrl = process.env.ELECTRON_START_URL || url.format({
	//   pathname: path.join(__dirname, '../templates/index.html'), 
	//   protocol: 'file:',
	//   slashes: true,
	// });

	// Use Vite dev server URL in development, otherwise use the built file
	const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:5173'

	mainWindow.loadURL(startUrl)

	mainWindow.webContents.on('before-input-event', (event, input) => {
		if (input.key === 'F12' && input.type === 'keyDown') {
			mainWindow.webContents.toggleDevTools()
			event.preventDefault()  // prevents other F12 default actions if any
		}
	})

	mainWindow.webContents.on('did-finish-load', () => {
		// Get the screen resolution
		const primaryDisplay = screen.getPrimaryDisplay()
		const { width, height } = primaryDisplay.workAreaSize

		let zoomFactor = Math.min(width / 1920, height / 1080)
		mainWindow.webContents.setZoomFactor(zoomFactor)
	})
}

app.whenReady().then(() => {
	createWindow()
    createMenu()

	// For macOS, re-create a window in the app
	// When the dock icon is clicked and there are no other windows open
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('before-quit', () => {
    // Stop Noodle before quitting
    stopLdle()
    if (ldleMessagePipe) {
        stopLdleMessagePipe(ldleMessagePipe)
    }
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})
