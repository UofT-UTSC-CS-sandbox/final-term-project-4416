import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import CreateNote from './components/CreateNote';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import NoteBrowser from './components/NoteBrowser';
import { FlashCardsView } from './components/FlashCardsView';
import FlashCardList from './components/FlashCardList';
import CreateFlashCard from './components/CreateFlashCard';

function App() {
  return (
    <BrowserRouter>
      <RoutesWithSidebar />
    </BrowserRouter>
  );
}

function RoutesWithSidebar() {
  const location = useLocation(); // Get the current location
  const sidebarPaths = ['/Note', '/Profile','/browser',"/flashcards", "/Flash", "/create-new-flashcard"];
  const showSidebar = sidebarPaths.includes(location.pathname); // Determine whether to show the sidebar

  const [sidebarVisable, setVisbility] = useState(false);
  const handleSideBarVisability = (data) =>{
    setVisbility(data);
  }


  return (
    <>
      {['/', '/signup'].includes(location.pathname) ? (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      ) :(
        <div className='app-container'>
          {showSidebar && <div className='sidebar'><Sidebar visable_hidden={handleSideBarVisability}/></div>}
      <div className={`content ${sidebarVisable ? '' : 'hidden'}`}>
      <Routes>
        <Route path='/Note' element={<CreateNote />}></Route>
        <Route path='/Note/:noteid' element={<CreateNote />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
        <Route path='/browser' element={<NoteBrowser/>}></Route>
          <Route path="/flashcards" element={<FlashCardsView/>} />
          <Route path="/Flash" element={<FlashCardList/>} />
          <Route path="/create-new-flashcard" element={<CreateFlashCard />} />
      </Routes>
      </div>
      </div>)}

    </>
  );
}

export default App;
