<<<<<<< HEAD


function App() {
  return (
    <div >
      123
    </div>
  );
}

export default App;
=======
import Home from "./pages/home.js";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

const App = () => {
	let root = document.querySelector('#root');
  window.addEventListener('resize', Common.setVh(root));
  Common.setVh(root);

	return(
		<div className="fix-layout">
      <Header />
      <Home />
      <Footer />
    </div>
	);
}

export default App;
>>>>>>> main
