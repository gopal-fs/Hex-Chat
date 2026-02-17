import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { LightContext, LightProvider } from './context/LightMode.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <AuthProvider>
         <ChatProvider>
            <LightProvider>
               <App />
            </LightProvider>
         </ChatProvider>

      </AuthProvider>
   </BrowserRouter>



)
