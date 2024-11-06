package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.AchievenentDAO;
import kr.kh.ebook.model.vo.AchievenentVO;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AchievenentService {

	AchievenentDAO achDao;

	public List<AchievenentVO> selectNewAchList(String meId) {
		return achDao.selectNewAchList(meId);
	}

	public void updateCheckAch(int archNum, String meId) {
		achDao.updateCheckAch(archNum,meId);
	}

	public List<AchievenentVO> getUserAchivement(String userId) {
		return achDao.getUserAchivement(userId);
	}

	public void insertAch(int achNum, String me_id) {
		achDao.insertAch(achNum, me_id);
	}

	public List<AchievenentVO> getUserAchivement(String userId) {
		return achDao.getUserAchivement(userId);
	}

	public void insertAch(int achNum, String me_id) {
		achDao.insertAch(achNum, me_id);
	}
}