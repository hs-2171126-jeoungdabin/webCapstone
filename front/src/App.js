import React from "react";
import KoreanCharacterDisplay from "./components/KoreanCharacterDisplay"
import {  Route, Routes } from "react-router-dom"; 
import Education2 from './components/EducationPage/EducationPage';
import Main from './components/MainPage/MainPage';
import Quiz from './pages/Quiz.jsx';
import ToSign from './pages/ToSign.jsx';
import './App.css';

function App() {
  return (
    <div className="App">

       <Routes>
        <Route path="" element={<Main />} />
        <Route path="/education" element={<Education2 />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/tosign" element={<ToSign />} />
        <Route path="/transport" element={<KoreanCharacterDisplay/>}/>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/image" element={<Image />} />
          <Route path="/text" element={<Text />} />
          <Route path="/address" element={<Address />} />
          <Route path="/join" element={<Join />} />*/}
          
        </Routes>
      

    </div>
  );
}

export default App;