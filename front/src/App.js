import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Profile from './pages/Profile';
import Queue from './pages/Queue';
import ProtectedRoute from './routes/ProtectedRoute';
import RedirectToProfile from './routes/RedirectToProfile';
import styled from "styled-components";
import UserRoutes from './routes/UserRoutes';
import Admin from './pages/Admin';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden; 
    color: ${(props) => props.darkMode ? "white" : "black"};
    background-color: ${(props) => props.darkMode ? "black" : "white"};
  }
`;

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
`

const Button = styled.div`
  position: fixed;
  right: 3%;
  bottom: 2%;
`

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };
  
  return (
    <>
    <GlobalStyle darkMode={darkMode}/>
    <Div className="App">
      <Routes>
        <Route path="/" element={<RedirectToProfile darkMode={darkMode}/>} />
        <Route path="/profile" element={<ProtectedRoute component={UserRoutes} darkMode={darkMode} params={Profile}/>} />
        <Route path="/queue" element={<ProtectedRoute component={UserRoutes} darkMode={darkMode} params={Queue}/>} />
        <Route path="/admin" element={<ProtectedRoute component={Admin} darkMode={darkMode}/>}/>
      </Routes>
      <Button onClick={toggleDarkMode}><img src={darkMode ? "sun.svg" : "moon.svg"}></img></Button>
    </Div>
    </>
  );
}

export default App;
