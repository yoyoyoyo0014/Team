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

  const [str, setStr] = useState('');

    useEffect(() => {
        fetch('/api/api/test')
            .then((res) => res.text())
            .then(res=>{
              setStr(res);
            })
    }, []);

	return(
		<div className="fix-layout">
      <Header />
      <main id="body">
        <Home />

        <div className="App">
            백엔드 데이터 : {str}
        </div>

      </main>
      <Footer />
    </div>
	);
}

export default App;