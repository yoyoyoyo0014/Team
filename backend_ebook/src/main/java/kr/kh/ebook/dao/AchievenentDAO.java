package kr.kh.ebook.dao;

import java.util.List;

import kr.kh.ebook.model.vo.AchievenentVO;

public interface AchievenentDAO {

	List<AchievenentVO> selectNewAchList(String meId);

	void updateCheckAch(int achNum, String meId);

	List<AchievenentVO> getUserAchivement(String userId);

	void insertAch(int achNum, String me_id);

	int selectAchCount(String userId);
}