import React, { createContext, useState, useEffect, useCallback } from "react";
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

	const getInit = useCallback(async () => {
		let data;

		await axios(options)
		.then(res => {
			data = res.data;

			console.log(res);
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
		});

		if (data !== undefined) {
			setGenreList(data.genreList);
			setMajorGenreList(data.majorGenreList);
			setBook(data.book);

			console.log('data');
			console.log(data);
		}
	}, [])

	useEffect(() => {
    getInit();
  }, []);

  return (
    <GenreContext.Provider value={{ genreList, majorGenreList, book }}>
			{children}
		</GenreContext.Provider>
  );
};

export default GenreProvider;