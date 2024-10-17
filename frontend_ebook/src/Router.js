import { Routes, Route } from "react-router-dom";

import Main from "./components/main.js";
import MyBooks from "./pages/mypage/mybooks.js";
import BestSellers from "./pages/bestsellers.js";
import NewBooks from "./pages/newbooks.js";
import Event from "./pages/event.js";
import ForSales from "./pages/forsales.js";
import Meeting from "./pages/meeting.js";

import Login from "./pages/login.js";
import Join from "./pages/join.js";
import CartPage from "./pages/cart/cartpage.js";
import EpubReader from "./EpubReader.js";

function Router(){
	return(
		<Routes>
			<Route path="/" element={<Main/>} />
			<Route path="/mypage/mybooks/:bl_me_id" element={<MyBooks/>}/>
			<Route path="/bestsellers" element={<BestSellers/>}/>
			<Route path="/newbooks" element={<NewBooks/>}/>
			<Route path="/forsales" element={<ForSales/>}/>
			<Route path="/event" element={<Event/>}/>
			<Route path="/meeting" element={<Meeting/>}/>

			<Route path="/login" element={<Login/>}/>
			<Route path="/join" element={<Join/>}/>
			<Route path="/cart/:me_id" element={<CartPage />} />
			<Route path="/epub/:bl_me_id/:bk_num" element={<EpubReader />} /> {/* me_id와 bk_num 포함 */}
		</Routes>
	)
}

export default Router;