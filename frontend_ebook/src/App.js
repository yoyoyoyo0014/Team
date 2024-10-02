import Home from "./pages/home.js";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

import {useEffect, useState} from "react";

function App() {
	let root = document.querySelector('#root');
  window.addEventListener('resize', Common.setVh(root));
  Common.setVh(root);

	return(
		<div className="fix-layout">
      <Header />
      <main id="body">
        <Home />
      </main>
      <Footer />
    </div>
	);
}

export default App;