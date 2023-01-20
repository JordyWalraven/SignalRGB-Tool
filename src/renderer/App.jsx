/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BasicHeader from './components/BasicHeader';
import Homepage from './pages/Homepage';
import 'bootstrap/dist/css/bootstrap.css';
import NormalizedPage from './pages/NormalizedPage';
import EffectLogic from './Logic/EffectLogic';
import EffectSelectionPage from './pages/EffectSelectionPage';
import SideBar from './components/Sidebar';


export default function App() {

  const [effects, setEffects] = useState()
  const [selectedEffect, setSelectedEffect] = useState("")


  useEffect(() => {
    async function assignHtml(){
      const effectLogic = new EffectLogic();
      let htmlFiles ;
      await window.fileHandler.getLocalPath().then(async(e)=>{
      htmlFiles=  await window.fileHandler.getHtmlFiles(window.fileHandler.getDynamicPath(e));
      })
      let modifiedHtmlFiles = [];
      htmlFiles.forEach((file) => {
        console.log(file)
        modifiedHtmlFiles.push(effectLogic.modifyHtml(file));
      })
      setEffects(modifiedHtmlFiles);
      console.log(modifiedHtmlFiles);
    }
    assignHtml();

  }, [])

  function refresh(){
    setSelectedEffect(JSON.parse(sessionStorage.getItem("selectedEffect")));
    console.log()
  }

  return (
    <>


    <Router>
    <BasicHeader effect={selectedEffect}/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="normalized" element={<NormalizedPage/>}/>
        <Route path="effectSelection" element={<EffectSelectionPage canvasEffects={effects} updateHeader={refresh}/>}/>
      </Routes>
      <SideBar/>
    </Router>
    </>
  );
}
