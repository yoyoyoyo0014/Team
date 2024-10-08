import Router from "../Router.js";

const Home = ({section, genreList}) => {
	return(
    <Router genreList={genreList} section={section} />
	);
}

export default Home;