import Home from "./pages/home.js";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

import React, { useEffect, useState } from 'react';

function App() {
	let root = document.querySelector('#root');
  window.addEventListener('resize', Common.setVh(root));
  Common.setVh(root);

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/ex')
      .then(res => res.text())
      .then(res=>setMessage(res))
      .catch(error => 
        console.error( error)
      );
  }, []);

	return(
		<div className="fix-layout">
      <Header />
      <main id="body">
        <Home />

        <div className="App">
          <h1>{message}</h1>
        </div>

      </main>
      <Footer />

    </div>
	);
}

export default App;