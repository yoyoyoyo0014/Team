import React, { useEffect, useState } from "react";
import { LoginProvider } from "./context/LoginContext"; // LoginContext 제공
import Router from "./Router"; // Router.js 불러오기
import axios from "axios";

import Header from "./components/header.js";
import Footer from "./components/footer.js";
import * as Common from './js/common.js';
import './css/default.css';
import './css/style.css';


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

  useEffect(() => {
    window.addEventListener('resize', ()=> Common.setVh());
    Common.setVh();

		(async () => {
			await axios(options)
			.then(res => {
				setGenreList(res.data.genreList);
				setMajorGenreList(res.data.majorGenreList);
				setBook(res.data.book);
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

    // 화면 크기에 맞게 vh 설정 및 resize 이벤트 리스너 추가
    useEffect(() => {
      const root = document.querySelector('#root');
      const handleResize = () => Common.setVh(root);
      // 처음 로드 시 한 번 실행
      Common.setVh(root);
      // 리사이즈 이벤트 추가
      window.addEventListener('resize', handleResize);
      // 컴포넌트 언마운트 시 이벤트 제거
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
			<LoginProvider>
				<div className="fix-layout">
					<Header setSection={setSection}/>
					<main id="body">
						<Router section={section} genreList={genreList} book={book}/>
					</main>
				</div>
				<Footer />
			</LoginProvider>
    );
}

export default App;
