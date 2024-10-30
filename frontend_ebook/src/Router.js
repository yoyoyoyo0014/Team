import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./context/LoginContext.js"; // LoginContext 사용
import Main from "./components/main.js";
import MyBooks from "./pages/mypage/mybooks.js";
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
import EventDetail from "./pages/eventDetail.js";
import OrderPage from './pages/cart/order.js';
import MyBadges from "./pages/mypage/mybadges.js";

import PostList from "./pages/post/list.js";
import JoinSelect from "./pages/joinSelect.js";
import JoinCompany from "./pages/joincompany.js";
import MyCompanyIndex from "./pages/mycompany/index.js";
import BookInsert from './components/book/bookInsert.js';

function Router({section}) {
	const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path="/" element={<Main section={"bestSellers"}/>} />

      <Route path="/newbooks" element={<Main section={"newBooks"}/>} />
      <Route path="/forsales" element={<ForSales />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<JoinSelect />} />
      <Route path="/join/normal" element={<Join />} />
      <Route path="/join/company" element={<JoinCompany />} />

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
      <Route
        path="/mypage/badges"
        element={isLoggedIn ? <MyBadges/> : <Navigate to="/login" />}
      />

      <Route path="/mycompany" element={isLoggedIn ? <MyCompanyIndex/> : <Navigate to="/login"/>}/>
      <Route path="/mycompany/bookInsert" element={<BookInsert/>}/>
      
      <Route path="/cart/:me_id" element={isLoggedIn ? <CartPage/> : <Navigate to="/login" />}/>
      <Route path="/buy" element={isLoggedIn ? <OrderPage/> : <Navigate to="/login" />}/>

      <Route path="/event" element={<Event />} />
      <Route path="/event/:ev_id" element={<EventDetail />} />

      <Route path="/request" element={<PostList />} />
    </Routes>
  );
}

export default Router;
