// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // http://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// http://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      
      // "/api": "http://exchbit.onrender.com",
      "/api":"http://localhost:8000"
      
    },
  },
  plugins: [react()],
}); 