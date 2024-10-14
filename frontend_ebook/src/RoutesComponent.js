import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./context/LoginContext"; // LoginContext 사용
import Main from "./components/main.js";
import MyBooks from "./pages/mypage/mybooks.js";
import BestSellers from "./pages/bestsellers.js";
import NewBooks from "./pages/newbooks.js";
import Event from "./pages/event.js";
import ForSales from "./pages/forsales.js";
import Meeting from "./pages/meeting.js";

import Login from "./pages/login.js";
import Join from "./pages/join.js";
import NaverCallback from "./components/auth/NaverCallback"; // NaverCallback 컴포넌트 import

function RoutesComponent() {

	const { isLoggedIn } = useContext(LoginContext);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/mypage/mybooks"
        element={isLoggedIn ? <MyBooks /> : <Navigate to="/login" />}
      />
      <Route path="/bestsellers" element={<BestSellers />} />
      <Route path="/newbooks" element={<NewBooks />} />
      <Route path="/forsales" element={<ForSales />} />
      <Route path="/event" element={<Event />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />

      {/* 네이버 로그인 콜백 경로 */}
      <Route path="/auth/naver/callback" element={<NaverCallback />} />

    </Routes>
  );
}

export default RoutesComponent;
