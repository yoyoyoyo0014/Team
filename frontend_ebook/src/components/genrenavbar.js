import { useContext } from 'react';
import { GenreContext } from '../context/GenreContext';
import { Link } from 'react-router-dom';

const GenreNavBar = () => {
	const {genreList} = useContext(GenreContext);
	return(
		<nav id="category-navbar" className="theme-box">
			<div className="category-navbar-wrapper scrollbar-no-padding">
			{genreList && genreList.map(genre => {
					return(<ul>
						{genre.length !== undefined && genre.map(secondGenre => {
								return(<li><Link to={"/ebook/search/all/"+secondGenre.ge_num+"/popularity/"+0+"/SearchWord="}>{secondGenre.ge_name}</Link></li>)
							})
						}
					</ul>)
				}
			)}
			</div>
		</nav>
	)
}

export default GenreNavBar;