// src/admin/adminIndex.js
import Button from "../components/form/button";
import "../admin/adminIndex.css"; // 추가: CSS 파일 import

function AdminIndex() {
    return (
        <div className="admin-page">
            <h1>Book<br />Garden</h1> {/* 중앙에 배치될 BookGarden 로고 */}
            <h2>관리자 페이지</h2> {/* BookGarden 밑에 '관리자 페이지' */}

            <div className="admin-buttons">
                <Button type="button" text="회원 관리" cls="btn btn-admin full" click={() => alert("회원 관리")} />
                <Button type="button" text="도서 관리" cls="btn btn-admin full" click={() => alert("도서 관리")} />
            </div>
        </div>
    );
}

export default AdminIndex;
