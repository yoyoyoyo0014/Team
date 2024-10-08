import Home from "./pages/home.js";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

import {useState} from "react";

function App() {
	// let ele = document.querySelector('#body');
  // window.addEventListener('resize', Common.setVh(ele));
  // Common.setVh(ele);

  let [section, setSection] = useState('');

  const selectSection = (section) => {
    setSection(section);
  }

	return(
		<div className="fix-layout">
      <Header selectSection={selectSection}/>
      <main id="body">
        <Home />
        <div></div>
      </main>
      <Footer />
    </div>
	);
}

export default App;
