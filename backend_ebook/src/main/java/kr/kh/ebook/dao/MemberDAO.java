package kr.kh.ebook.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import kr.kh.ebook.model.vo.MemberVO;

@Repository
@Mapper
public interface MemberDAO {
	
	// 회원 ID로 사용자 조회 (일반 로그인, 소셜 로그인 통합)
	MemberVO findMemberById(String me_id);
	
	// 카카오 회원 등록
    void insertKakaoMember(MemberVO member);
	
	// 네이버 ID로 사용자 정보 조회
	MemberVO selectMemberByNaverId(String naverId);
	
	// 네이버 간편 회원가입 후, 사용자 정보 db 저장
	void insertMember(MemberVO member);
	
	// 회원 정보를 db에서 찾거나 등록한다. ( 구글 )
	MemberVO findMemberByEmail(String email); // 찾기.
	void insertGoogleMember(MemberVO member);
	
	// 일반 로그인
	@Select("SELECT * FROM member WHERE me_id = #{me_id}")
    MemberVO getMemberById(String me_id);
	
	MemberVO getMemberByNickname(String meNickname);

	// 일반 회원가입 후, 사용자 정보 db 저장
	void insertNormalMember(MemberVO memberVO);

	// 닉네임 수정
	void updateNickname(String memberId, String newNickname);

	void earnPoint(String memberId, int total);
	
	MemberVO findById(String memberId); // 사용자 정보 가져오기

	// 사용자 ID로 비밀번호 업데이트
	void updatePassword(@Param("userId") String userId, @Param("newPassword") String newPassword);

	void updateMember(MemberVO member);
	
}
