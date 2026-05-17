import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import './global.css'
import { Home } from './popup/home.tsx'
import LoginSection from './popup/login.tsx'
import RepoSetupSection from './popup/repo-setup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="relative w-90 min-h-120 text-[#2A2A2C] bg-[#FEF6F8]">
      <HashRouter>
      <Routes>
        <Route path='/index.html' element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        
        <Route path='/login' element={<LoginSection />} />
        <Route path='/repo-setup' element={<RepoSetupSection />} />
      </Routes>
      </HashRouter>
    </div>
  </StrictMode>,
)
