package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.AchievenentListVO;
import kr.kh.ebook.model.vo.AchievenentVO;

public interface AchievenentDAO {

	List<AchievenentListVO> selectAchList(@Param("achNum")int achNum,@Param("memberNum") String memberNum);

	boolean insertAchList(@Param("achNum")int achNum,@Param("memberNum") String memberId);

	AchievenentVO selectAchievenent(@Param("achNum") int achNum);

	List<AchievenentListVO> selecNowCollectAchList(@Param("meId")String meId);

	boolean updateCheckCollectAchList(@Param("achNum")int archNum,@Param("meId") String meId);

	List<AchievenentVO> allAchievenentList();

	List<AchievenentVO> getUserAchivement(String userId);
}