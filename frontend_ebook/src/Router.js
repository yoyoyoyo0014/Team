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
import EditProfile from "./pages/mypage/editprofile.js";

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

import AdminIndex from './admin/adminIndex';  // adminIndex 컴포넌트 import
import MemberManagement from "./admin/memberManagement.js";

import OrderSuccess from "./pages/cart/ordersuccess.js";

import List from './pages/post/list';
import Detail from "./pages/post/detail.js";
import Update from "./pages/post/update.js";
import Insert from "./pages/post/insert.js";

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
      <Route path="/ebook/search/:bo_country/:bo_genre/:bo_category/:bo_page/:bo_search" element ={<BookSearch/>}/>

      <Route path="/mypage" element={isLoggedIn ? <MypageIndex/> : <Navigate to="/login"/>}/>
      
      {/* 개인 정보 수정 */}
      <Route path="/edit-profile" element={isLoggedIn ? <EditProfile/> : <Navigate to="/login" />} />
      
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
      
      <Route path="/admin" element={<AdminIndex />} />  {/* /admin 경로 설정 */}
      <Route path="/admin/member-management" element={<MemberManagement />} />

      <Route path="/cart/:me_id" element={isLoggedIn ? <CartPage/> : <Navigate to="/login" />}/>
      <Route path="/buy" element={isLoggedIn ? <OrderPage/> : <Navigate to="/login" />}/>

      <Route path="/event" element={<Event />} />
      <Route path="/event/:ev_id" element={<EventDetail />} />

      <Route path="/request" element={<PostList />} />

      <Route path="/post/list/:co_num" element={<List />} />
			<Route path="/post/detail/:co_num/:po_num" element={<Detail />} />
			<Route path="/post/update/:po_num" element={isLoggedIn ? <Update/> : <Navigate to="/login" />} />
			<Route path="/post/insert/:co_num" element={isLoggedIn ? <Insert/> : <Navigate to="/login" />} />

      <Route path="/order/success" element={isLoggedIn ? <OrderSuccess/> : <Navigate to="/login" />}/>
    </Routes>
  );
}

export default Router;
