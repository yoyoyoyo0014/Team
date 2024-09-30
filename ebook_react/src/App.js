import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

function App() {
  let root = document.querySelector('#root');
  window.addEventListener('resize', Common.setVh(root));
  Common.setVh(root);

  return (
    <div className="fix-layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;