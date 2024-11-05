#관리자 및 사용자, 사업자 추가
insert into member(me_id, me_nickname, me_name, me_pw, me_email, me_birth, me_adult, me_authority, me_ms_name)
values('admin123','관리자','관리자','admin123','admin123@naver.com','990909','1','admin','사용'),
('asd123','asd닉네임','asd123실명','asd123','asd123@naver.com','990909','1','user','사용');

#책 추가 (연령,성별구매 표를 보기위해 임의로 구매수 변경)
insert into book(bk_name, bk_state, bk_publisher, bk_date, bk_sg_num, bk_plot, bk_price, bk_amount, bk_isbn, bk_totalPage, bk_agelimit,bk_totalPurchase,bk_age_60_male,bk_age_60_female
,bk_age_50_male,bk_age_50_female,bk_age_40_male,bk_age_40_female,bk_age_30_male,bk_age_30_female,bk_age_20_male,bk_age_20_female
,bk_age_10_male,bk_age_10_female
,bk_score,bk_reviewCount)
values('빠르게 생각하고 똑똑하게 말하라','해외도서','출판사 이름','20240910','2','줄거리','17100','0','0010011101','320','12'
,400,22,10,14,33,46,66,10,53,43,16,30,57
,4,1);

#리뷰 추가
insert into review(re_content, re_bk_num, re_star, re_date, re_me_id)
values('리뷰 추천 내용','1','4','20241001','asd123');

#저자 추가
insert into writer(wr_name, wr_profile)
values('맷 에이브러햄스 (Matt Abrahams)','《피터 버핏의 12가지 성공 원칙》, 《결국, 당신은 바뀔 것이다》, 《나는 직장에 다니면서 12개의 사업을 시작했다》, 《왜 회사에서는 이상한 사람이 승진할까?》, 《1분 협상수업》, 《디자이너 브랜드 시작하기》, 《독한 충고》 등 역서');

#게시글 추가
insert into post(po_title, po_content, po_me_id, po_me_nickname, po_date, po_co_num)
values('공지제목','공지내용','admin123','관리자','2024-10-01','1'),
('공지제목1','공지내용1','admin123','관리자','2024-10-01','1'),
('공지제목2','공지내용2','admin123','관리자','2024-10-02','1'),
('공지제목3','공지내용3','admin123','관리자','2024-10-03','1'),
('공지제목4','공지내용4','admin123','관리자','2024-10-04','1'),
('공지제목5','공지내용5','admin123','관리자','2024-10-05','1'),
('공지제목6','공지내용6','admin123','관리자','2024-10-06','1'),
('공지제목7','공지내용7','admin123','관리자','2024-10-07','1'),
('공지제목8','공지내용8','admin123','관리자','2024-10-08','1'),
('공지제목9','공지내용9','admin123','관리자','2024-10-09','1'),
('공지제목10','공지내용10','admin123','관리자','2024-10-10','1'),
('공지제목11','공지내용11','admin123','관리자','2024-10-11','1'),
('공지제목12','공지내용12','admin123','관리자','2024-10-12','1'),
('공지제목13','공지내용13','admin123','관리자','2024-10-13','1'),
('책 신청','책 신청 내용','asd123','asd닉네임','2024-10-01','2'),
('이벤트','이벤트내용','admin123','관리자','2024-10-01','3'),
('작가와의 만남','작가와의 만남','admin123','관리자','2024-10-01','4');

#도전과제 추가
insert into achievenent(ac_title, ac_info, ac_id, ac_icon)
values('첫 방문을 축하합니다!','처음 방문 시 달성','creatAccount', 'fa-ribbon'),
('첫 구매를 축하합니다!','첫 구매 시 달성','buyBookCount=1', 'fa-credit-card');

#작가 추가
insert into writer_list(wl_wr_num,wl_bk_num,wl_wt_num)
values(1,1,1)
