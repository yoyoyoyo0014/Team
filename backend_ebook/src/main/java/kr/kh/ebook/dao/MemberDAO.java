package kr.kh.ebook.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import kr.kh.ebook.model.vo.MemberVO;

@Repository
@Mapper
public interface MemberDAO {
	
	// 회원 ID로 사용자 조회 ( 카카오 )
	MemberVO findMemberById(String me_id);
	
	// 카카오 회원 등록
    void insertKakaoMember(MemberVO member);
	
	// 네이버 ID로 사용자 정보 조회
	MemberVO selectMemberByNaverId(String naverId);
	
	// 회원 정보를 db에서 찾거나 등록한다. ( 구글 )
	MemberVO findMemberByEmail(String email); // 찾기.
	void insertGoogleMember(MemberVO member);

	@Select("SELECT * FROM member WHERE me_id = #{me_id}")
    MemberVO getMemberById(String me_id);

	void insertMember(MemberVO member);

	
}
