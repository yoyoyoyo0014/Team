import { useState } from 'react';

const GenreNavBar = ({genreList}) => {
	console.log(genreList);
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