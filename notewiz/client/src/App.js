import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import CreateNote from './components/Notes/CreateNote';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Sidebar from './components/Sidebar';
import Profile from './components/Auth/Profile';
import NoteBrowser from './components/FileManagement/NoteBrowser';
import { FlashCardsView } from './components/flashcard/FlashCardsView';
import FlashCardList from './components/flashcard/FlashCardList';
import CreateFlashCard from './components/flashcard/CreateFlashCard';
import PublicNoteDisplay from "./components/PublicNoteDisplay/PublicNoteDisplay";
import ToastNotification from './components/ToastNotification';
import GlobalSearch from "./components/GlobalSearch/GlobalSearch";
import MindMapList from "./components/mindmap/MindMapList";
import MindMapWindow from "./components/mindmap/MindMapWindow";
import MindMap from "./components/mindmap/MindMap";


function App() {
  return (
    <BrowserRouter>
      <RoutesWithSidebar />
      <ToastNotification/>
    </BrowserRouter>

  );
}

function RoutesWithSidebar() {
  const location = useLocation(); // Get the current location
  const sidebarPaths = ['/GlobalSearch', '/Note', '/Profile', '/browser', "/flashcards", "/Flash", "/create-new-flashcard","/Mind","/create-new-mind-map"];
  const showSidebar = sidebarPaths.includes(location.pathname) || /^\/Note\/.*$/ || /^\/create-new-mind-map\/.*$/; // Determine whether to show the sidebar

  const [sidebarVisable, setVisbility] = useState(false);
  const handleSideBarVisability = (data) => {
    setVisbility(data);
  }

  const [modeTheme, setModeTheme] = useState("light");
  const handlemodeTheme = (model) => {
    setModeTheme(model);
  }

  const handleLogout = () => {
    setModeTheme('light');
  }


  return (
    <div className='Apps'>
      {(['/', '/signup'].includes(location.pathname) ||
        /^\/shared-note\/.*$/.test(location.pathname)) ? (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/shared-note/:id' element={<PublicNoteDisplay />} />
        </Routes>
      ) : (
        <div className={`app-container ${modeTheme === 'light' ? '' : 'dark'}`} >
          {showSidebar && <div className='sidebar'>
            <Sidebar visable_hidden={handleSideBarVisability} modeStyle={handlemodeTheme} />
          </div>}
          <div className={`content ${sidebarVisable ? '' : 'hidden'}`}>
            <div id={modeTheme}>
              <Routes>
                <Route path='/Note' element={<CreateNote />}></Route>
                <Route path='/GlobalSearch' element={<GlobalSearch />}></Route>
                <Route path='/Note/:noteid' element={<CreateNote />}></Route>
                <Route path='/Profile' element={<Profile logout={handleLogout} />}></Route>
                <Route path='/browser' element={<NoteBrowser />}></Route>
                <Route path="/flashcards" element={<FlashCardsView />} />
                <Route path="/Flash" element={<FlashCardList />} />
                <Route path="/create-new-flashcard" element={<CreateFlashCard />} />
                <Route path="/Mind" element={<MindMapList />} />
                <Route path="/MindMapWindow" element={<MindMapWindow />} />
                <Route path="/create-new-mind-map" element={<MindMap/>}/>
                <Route path='/create-new-mind-map/:id' element={<MindMap />}></Route>
              </Routes>
            </div>
          </div>
        </div>)}
    </div>
  );
}

export default App;
