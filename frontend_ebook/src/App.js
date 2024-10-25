import React, { useEffect, useState } from "react";
import { LoginProvider } from "./context/LoginContext"; // LoginContext 제공
import { GenreProvider } from "./context/GenreContext.js";

import Router from "./Router"; // Router.js 불러오기
import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';
import './css/default.css';
import './css/style.css';

<<<<<<< HEAD
import {useEffect, useState} from "react";

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
    </div>
=======
function App() {
	let [section, setSection] = useState('');

	const AppProvider = ({ contexts, children }) => contexts.reduce(
		(prev, context) => React.createElement(context, {
			children: prev
		}),
		children
	)

  useEffect(() => {
    window.addEventListener('resize', ()=> Common.setVh());
    Common.setVh();
  }, []);

	return (
		<AppProvider contexts={[
			LoginProvider,
			GenreProvider
		]}>
			<div className="fix-layout">
				<Header setSection={setSection}/>
				<main id="body">
					<Router section={section}/>
				</main>
			</div>
			<Footer />
		</AppProvider>
>>>>>>> KCL
	);
}

export default App;
