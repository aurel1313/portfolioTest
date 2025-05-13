import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import { Home } from './views/Home/Home';
import { Modal } from './components/Modal/Modal';
function App() {
 

  return (
    <>
          <Routes>
                <Route path="/" element={<Home/>} />
                <Route path='/:id' element={<Modal/>} />
             
            </Routes>
    </>
  )
}

export default App
