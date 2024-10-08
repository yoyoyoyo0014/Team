#관리자 추가
insert into member(me_id, me_nickname, me_pw, me_email, me_birth, me_adult, me_authority, me_ms_name)
values('admin123','admin','admin123','admin123@naver.com','990909','1','admin','사용');

#책 추가
insert into book(bk_name, bk_state, bk_me_id, bk_date, bk_sg_num, bk_plot, bk_price, bk_amount, bk_isbn, bk_totalPage, bk_agelimit)
values('빠르게 생각하고 똑똑하게 말하라','해외도서','admin123','20240910','2','줄거리','17100','0','0010011101','320','12');

#리뷰 추가
insert into review(re_content, re_bk_num, re_star, re_date, re_me_id)
values('리뷰 추천 내용','1','4.5','20241001','admin123');

#저자 추가
insert into writer(wr_name, wr_profile)
values('맷 에이브러햄스 (Matt Abrahams)','《피터 버핏의 12가지 성공 원칙》, 《결국, 당신은 바뀔 것이다》, 《나는 직장에 다니면서 12개의 사업을 시작했다》, 《왜 회사에서는 이상한 사람이 승진할까?》, 《1분 협상수업》, 《디자이너 브랜드 시작하기》, 《독한 충고》 등 역서');

#게시글 추가
insert into post(po_title, po_content, po_me_id, po_date, po_co_num)
values('공지제목','공지내용','admin123','2024-10-01','1');

#도전과제 추가
insert into achievenent(ac_title, ac_info)
values('첫 방문을 축하합니다!','처음 방문 시 달성');