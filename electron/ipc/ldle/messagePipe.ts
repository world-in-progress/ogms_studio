import express from 'express'
import { Server } from 'http'
import LdleContext from './context'
import { BrowserWindow } from 'electron'

const ctx = LdleContext.getInstance()

export function startLdleMessagePipe(port: number = 3001, mainWindow: BrowserWindow): Promise<Server> {
    return new Promise((resolve, reject) => {
        const app = express()
        app.use(express.json())
        
        app.get('/ready', (_, res) => {
            ctx.is_ready = true
            res.status(200).send('LDLE ready flag received')
        })

        app.get('/refresh', (_, res) => {
            if (!ctx.is_ready) res.status(503).send('LDLE not ready')
            else {
                // Send an update message to the renderer process
                mainWindow.webContents.send('app-refresh')
                res.status(200).send('LDLE update sent message')
            }
        })

        const server = app.listen(port, () => {
            resolve(server)
        })

        server.on('error', (err) => {
            reject(err)
        })
    })
}

export function stopLdleMessagePipe(server: Server): Promise<void> {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}
