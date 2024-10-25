import Home from "./pages/home.js";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

import {useEffect, useState} from "react";
import { AchievenentEvent, CollectAchievenent } from "./components/achievenent/achievenentEvent.js";
import { AchievenentSwitch } from "./components/achievenent/AchieventContext.js";
function App() {
  let [section, setSection] = useState('');
  let [genreList, setGenreList] = useState([{}]);
  let [majorGenreList, setMajorGenreList] = useState([{}]);

  useEffect(() => {

    window.addEventListener('resize', ()=> Common.setVh());
    Common.setVh();

    fetch('/main')
			.then((res) => res.json())
			.then(res=>{
				setGenreList(res.genreList);
        setMajorGenreList(res.majorGenreList);
			})
  }, [])

  const selectSection = (section) => {
    setSection(section);
  }

	return(
		<div>
      <Header selectSection={selectSection} genreList={genreList} majorGenreList={majorGenreList}/>
      <main id="body" className="fix-layout">
        <Home genreList={genreList}/>
      </main>
      <Footer />
      <AchievenentSwitch>
        <AchievenentEvent/>
      </AchievenentSwitch>
    </div>
	);
}

export default App;
