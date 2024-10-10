package kr.kh.ebook.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.kh.ebook.model.vo.MemberVO;

@Repository
@Mapper
public interface MemberDAO {
	
	// 회원 ID로 사용자 조회 ( 카카오 )
	MemberVO findMemberById(String me_id);
	
	// 네이버 ID로 사용자 정보 조회
	MemberVO selectMemberByNaverId(String naverId);
	
}
