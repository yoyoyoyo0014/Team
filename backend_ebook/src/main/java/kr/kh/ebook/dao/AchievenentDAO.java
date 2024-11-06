package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.AchievenentVO;

public interface AchievenentDAO {

	List<AchievenentVO> selectNewAchList(String meId);

	void updateCheckAch(int achNum, String meId);

	List<AchievenentVO> getUserAchivement(String userId);

	boolean updateCheckCollectAchList(@Param("achNum")int archNum,@Param("meId") String meId);

	List<AchievenentVO> allAchievenentList();
}