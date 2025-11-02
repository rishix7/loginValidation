import React from 'react'
import {BrowserRouter,Route,Routes,Router} from 'react-router-dom'
import LoginPage from './components/loginPage.jsx'
import RegisterPage from './components/registerPage.jsx'
import  Welcome  from './components/welcome.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App