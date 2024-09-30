# 책 분류
insert into bk_genre(bg_name) values('총류'),('철학'),('종교'),('사회과학'),('자연과학'),('기술과학'),('예술'),('언어'),('문학'),('역사');

# 작가 유형
insert into writer_type(wt_name) values('작가'),('저자'),('옮긴이'),('그림');

#커뮤니티
insert into community(co_name) values ('공지'),('책 요청');

#신고 유형
insert into report_type(rt_name) values('광고'),('음란'),('욕설'),('도용'),('리뷰 형식에 맞지 않음'),('기타');

#회원 상태
insert into member_state(ms_name) values('사용'),('기간 정지'),('영구 정지');