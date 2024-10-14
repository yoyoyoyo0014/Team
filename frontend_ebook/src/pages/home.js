import RoutesComponent from "../RoutesComponent.js";

const Home = ({section, genreList, book}) => {
	return(
    <RoutesComponent genreList={genreList} section={section} book={book}/>
	);
}

export default Home;