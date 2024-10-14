import Router from "../Router.js";

const Home = ({section, genreList, book}) => {
	return(
    <Router genreList={genreList} section={section} book={book}/>
	);
}

export default Home;