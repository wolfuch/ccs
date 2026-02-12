import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // obliga a usar localhost
    port: 3002,        // puerto preferido
    strictPort: false, // si está ocupado, busca el siguiente libre
    open: true         // abre el navegador automáticamente
  }
})
