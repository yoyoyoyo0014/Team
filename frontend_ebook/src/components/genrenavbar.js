import { useState, useContext } from 'react';
import { GenreContext } from '../context/GenreContext';

const GenreNavBar = () => {
	const {genreList} = useContext(GenreContext);
	return(
		<nav id="category-navbar" className="theme-box">
			<div className="category-navbar-wrapper scrollbar-no-padding">
			{
				genreList && genreList.map(genre => {
						return(
							<ul>
								{
									genre.length !== undefined && genre.map(secondGenre => {
										return(<li>{secondGenre.ge_name}</li>)
									})
								}
							</ul>
						)
					}
				)
			}
			</div>
		</nav>
	)
}

export default GenreNavBar;