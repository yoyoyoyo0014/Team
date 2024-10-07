import { Routes, Route } from "react-router-dom";

import Main from "./components/main.js";
import MyBooks from "./pages/mypage/mybooks.js";
import BestSellers from "./components/main/bestsellers.js";
import NewBooks from "./components/main/newbooks.js";
import Event from "./pages/event.js";
import ForSales from "./pages/forsales.js";
import Meeting from "./pages/meeting.js";

import Login from "./pages/login.js";
import Join from "./pages/join.js";

function Router(){
	return(
		<Routes>
			<Route path="/" element={<Main/>} />
			<Route path="/mypage/mybooks" element={<MyBooks/>}/>
			<Route path="/main/bestsellers" element={<BestSellers/>}/>
			<Route path="/main/newbooks" element={<NewBooks/>}/>
			<Route path="/forsales" element={<ForSales/>}/>
			<Route path="/event" element={<Event/>}/>
			<Route path="/meeting" element={<Meeting/>}/>

			<Route path="/login" element={<Login/>}/>
			<Route path="/join" element={<Join/>}/>
		</Routes>
	)
}

export default Router;