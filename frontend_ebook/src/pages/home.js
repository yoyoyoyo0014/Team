import Router from "../Router.js";

const Home = ({genreList}) => {
	return(
    <Router genreList={genreList} />
	);
}

export default Home;