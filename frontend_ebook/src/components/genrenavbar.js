import { useEffect, useState } from 'react';

const GenreNavBar = () => {
	const [genreList, setGenreList] = useState([]);

	useEffect(() => {
		fetch('/main')
			.then((res) => res.json())
			.then(res=>{
				setGenreList(res.genreList);
				console.log(genreList)
			})
  }, []);

	return(
		<nav id="category-navbar" className="theme-box">
				{
					genreList.map(genre => {
							return(
								<ul>
									{
										genre.map(secondGenre => {
											return(<li>{secondGenre.ge_name}</li>)
										})
									}
								</ul>
							)
						}
					)
				}
			</nav>
	)
}

export default GenreNavBar;