import fs from 'fs'
import path from 'path'
import { spawn, ChildProcess } from 'child_process'

let noodleProcess: ChildProcess | null = null

export function startNoodle(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const readyFlagPath = path.join(process.cwd(), 'temp', 'noodle_ready.flag')

        // Clean up any existing flag file
        if (fs.existsSync(readyFlagPath)) {
            fs.unlinkSync(readyFlagPath)
        }

        // Watch for the ready flag file
        const checkReady = () => {
            if (fs.existsSync(readyFlagPath)) {
                resolve()
                return
            }
            setTimeout(checkReady, 100) // check every 100ms
        }
            
        // Start checking after a short delay
        setTimeout(checkReady, 1000)

        // Start the Noodle process
        noodleProcess = spawn(
            'uv',
            [
                'run', 'main.py'
            ],
            {
                cwd: process.cwd(),
                stdio: 'pipe'
            }
        )

        const handleOutput = (data: Buffer, source: string) => {
            const output = data.toString()
            console.log(`Noodle ${source}:\n${output}`)
        }
        noodleProcess.stdout?.on('data', data => handleOutput(data, 'stdout'))
        noodleProcess.stderr?.on('data', data => handleOutput(data, 'stderr'))

        noodleProcess.on('close', code => {
            console.log(`Noodle exited with code ${code}`)
            noodleProcess = null
        })

        noodleProcess.on('error', err => {
            console.error(`Failed to start Noodle: ${err}`)
            noodleProcess = null
            reject(err)
        })
            
        // Timeout fallback
        setTimeout(() => {
            reject(new Error('Noodle startup timeout'))
        }, 30000)
    })
}

export function stopNoodle(): void {
    if (noodleProcess) {
        noodleProcess.kill()
        noodleProcess = null
    }
}