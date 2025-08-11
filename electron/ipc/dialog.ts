// Handlers removed from main.ts
// !!!! Cannot use directly
// TODO: Implement file dialog handlers
import { dialog, ipcMain } from 'electron'

ipcMain.handle('dialog:openFile', async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{ name: 'Vector Files', extensions: ['shp', 'geojson'] },
			{ name: 'All Files', extensions: ['*'] }
		],
	})

	if (canceled || filePaths.length === 0) {
		return null
	}
	return filePaths[0]
})

ipcMain.handle('dialog:openTiffFile', async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{ name: 'TIF Files', extensions: ['tif', 'tiff'] },
			{ name: 'All Files', extensions: ['*'] }
		],
	})

	if (canceled || filePaths.length === 0) {
		return null
	}
	return filePaths[0]
})

ipcMain.handle('dialog:openTxtFile', async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{ name: 'TXT Files', extensions: ['txt'] },
			{ name: 'All Files', extensions: ['*'] }
		],
	})

	if (canceled || filePaths.length === 0) {
		return null
	}
	return filePaths[0]
})

ipcMain.handle('dialog:openInpFile', async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{ name: 'INP Files', extensions: ['inp'] },
			{ name: 'All Files', extensions: ['*'] }
		],
	})

	if (canceled || filePaths.length === 0) {
		return null
	}
	return filePaths[0]
})

ipcMain.handle('dialog:openCsvFile', async () => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [
			{ name: 'CSV Files', extensions: ['csv'] },
			{ name: 'All Files', extensions: ['*'] }
		],
	})

	if (canceled || filePaths.length === 0) {
		return null
	}
	return filePaths[0]
})