import Home from "./pages/home.js";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import * as Common from './js/common.js';

import './css/default.css';
import './css/style.css';

import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  let [section, setSection] = useState('');
  let [genreList, setGenreList] = useState([{}]);
  let [majorGenreList, setMajorGenreList] = useState([{}]);
  let [book, setBook] = useState({});

  const options = {
    url: '/main',
		method:'GET',
		header: {
			'Accept': 'application/json',
			'Content-Type': "'application/json';charset=UTP-8'"
		}
  }

	console.log('genrelist: ' + genreList);

  useEffect(() => {
		console.log('useEffect called');

    window.addEventListener('resize', ()=> Common.setVh());
    Common.setVh();

		(async () => {
			console.log('axios called before');
			await axios(options)
			.then(res => {
				setGenreList(res.data.genreList);
				setMajorGenreList(res.data.majorGenreList);
				setBook(res.data.book);
				console.log('axios called');
			})
			.catch((error) => {
				if (error.response) {
					// 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
					console.log(error.response.status);
				} else if (error.request) {
					// 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
					// 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
					// node.js에서는 http.ClientRequest 인스턴스입니다.
					console.log(error.request);
				} else {
					// 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
					console.log('Error', error.message);
				}
			})
		})();
  }, []);

	return(
		<div>
      <Header setSection={setSection} genreList={genreList} majorGenreList={majorGenreList}/>
      <main id="body" className="fix-layout">
        <Home section={section} genreList={genreList} book={book}/>
      </main>
      <Footer/>
    </div>
	);
}

export default App;
