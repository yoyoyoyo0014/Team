import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Context 생성
export const GenreContext = createContext();

export const GenreProvider = ({children}) => {
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

  // 애플리케이션이 로드될 때, localStorage에서 로그인 상태를 확인하고 유지
  useEffect(() => {
    axios(options)
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
  }, []);

  return (
    <GenreContext.Provider value={{ genreList, majorGenreList, book }}>
			{children}
		</GenreContext.Provider>
  );
};

export default GenreProvider;