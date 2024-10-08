import React, { useEffect } from "react";

import Header from "./components/header.js";
import Footer from "./components/footer.js";
import * as Common from './js/common.js';
import './css/default.css';
import './css/style.css';

import { LoginProvider } from "./context/LoginContext"; // LoginContext 제공
import RoutesComponent from "./RoutesComponent"; // Router.js 불러오기

function App() {
    // 화면 크기에 맞게 vh 설정 및 resize 이벤트 리스너 추가
    useEffect(() => {
      const root = document.querySelector('#root');
      const handleResize = () => Common.setVh(root);
      // 처음 로드 시 한 번 실행
      Common.setVh(root);
      // 리사이즈 이벤트 추가
      window.addEventListener('resize', handleResize);
      // 컴포넌트 언마운트 시 이벤트 제거
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <LoginProvider>
                <div className="fix-layout">
                    <Header />
                    <main id="body">
                        <RoutesComponent /> {/* RoutesComponent만 호출 */}
                    </main>
                    <Footer />
                </div>
        </LoginProvider>
    );
}

export default App;
