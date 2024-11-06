import React, { useEffect, useState } from "react";
import { LoginProvider } from "./context/LoginContext"; // LoginContext 제공
import { GenreProvider } from "./context/GenreContext.js";

import Router from "./Router"; // Router.js 불러오기
import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';
import './css/default.css';
import './css/style.css';

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
	);
}

export default App;