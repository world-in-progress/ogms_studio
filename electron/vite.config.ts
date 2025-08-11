import { defineConfig } from 'vite'
import { glob } from 'glob'
import path from 'path'

export default defineConfig({
  // Build configuration for Electron scripts
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: glob.sync('*.ts', { 
        cwd: __dirname,
        ignore: ['node_modules/**', 'dist/**', '**/*.d.ts']
      }).reduce((entries: Record<string, string>, file) => {
        const name = path.basename(file, '.ts')
        entries[name] = path.resolve(__dirname, file)
        return entries
      }, {}),
      external: [
        'electron',
        'express',
        'path',
        'fs',
        'child_process',
        'crypto',
        'os',
        'url',
        'util',
        'stream',
        'events',
        'http',
        'https',
        'net',
        'tty',
        'zlib',
        'querystring',
        'module',
        /^node:/,
        /^fsevents/,
        /node_modules\/fsevents/,
        /\.node$/,   
        /node_modules/
      ],
      output: {
        format: 'cjs',
        entryFileNames: '[name].js',
        exports: 'auto'
      }
    }
  }
})
