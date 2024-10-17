import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./context/LoginContext.js"; // LoginContext 사용
import Main from "./components/main.js";
import MyBooks from "./pages/mypage/mybooks.js";
import BestSellers from "./components/main/bestsellers.js";
import NewBooks from "./components/main/newbooks.js";
import Event from "./pages/event.js";
import ForSales from "./pages/forsales.js";

import Login from "./pages/login.js";
import Join from "./pages/join.js";
import BookDetail from "./components/book/bookDetail.js";
import BookSearch from "./components/book/bookSearch.js";
import CartPage from "./pages/cart/cartpage.js";
import MypageIndex from "./pages/mypage/index.js";

import NaverCallback from "./components/auth/NaverCallback.js"; // NaverCallback 컴포넌트 import
import EpubReader from "./pages/mypage/epubreader.js";

function Router({section}) {
	const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path="/" element={<Main section={section}/>} />

      <Route path="/bestsellers" element={<BestSellers />} />
      <Route path="/newbooks" element={<NewBooks />} />
      <Route path="/forsales" element={<ForSales />} />
      <Route path="/event" element={<Event />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />

      {/* 네이버 로그인 콜백 경로 */}
      <Route path="/auth/naver/callback" element={<NaverCallback />} />

      <Route path="/ebook/selectBook/:bk_num" element={<BookDetail/>}/>
      <Route path="/ebook/searchBook" element={<BookSearch/>}/>

      <Route path="/mypage" element={isLoggedIn ? <MypageIndex/> : <Navigate to="/login"/>}/>
      <Route
        path="/mypage/mybooks"
        element={isLoggedIn ? <MyBooks /> : <Navigate to="/login" />}
      />
      <Route
        path="/mypage/mybooks/book/:bk_num"
        element={isLoggedIn ? <EpubReader /> : <Navigate to="/login" />}
      />
      
      <Route path="/cart/:me_id" element={isLoggedIn ? <CartPage/> : <Navigate to="/login" />}/>
    </Routes>
  );
}

export default Router;
