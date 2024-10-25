package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.AchievenentDAO;
import kr.kh.ebook.model.vo.AchievenentListVO;
import kr.kh.ebook.model.vo.AchievenentVO;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AchievenentService {

	AchievenentDAO achDao;

	public List<AchievenentListVO> selectAchievenentList(int achNum, String memberNum) {
		return achDao.selectAchList(achNum,memberNum);
	}

	public boolean insertAchList(int achNum, String memberId) {
		return achDao.insertAchList(achNum,memberId);
	}

	public AchievenentVO selectAchievenent(int achNum) {
		return achDao.selectAchievenent(achNum);
	}

	public List<AchievenentListVO> selecNowCollectAchList(String meId) {
		return achDao.selecNowCollectAchList(meId);
	}

	public boolean updateCheckCollectAchList(int archNum, String meId) {
		return achDao.updateCheckCollectAchList(archNum,meId);
	}

	public List<AchievenentVO> allAchievenentList() {
		return achDao.allAchievenentList();
	}
}
