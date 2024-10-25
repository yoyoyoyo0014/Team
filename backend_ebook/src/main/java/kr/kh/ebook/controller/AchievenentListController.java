package kr.kh.ebook.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.function.Predicate;

import jakarta.annotation.PostConstruct;
import kr.kh.ebook.model.vo.AchievenentListVO;
import lombok.AllArgsConstructor;

@Component
@RestController
//@AllArgsConstructor
public class AchievenentListController {
	
//	@Autowired
	
	@PostConstruct
	public void init() {
		readAchievent("id=1/connection=1");
	}
	//도전과제들을 읽고 이벤트 추가
	public void readAchievent(String achId) {
		String[] achNumParts = achId.split("/");
		int achNum = getAchieventId(achNumParts[0]);
		System.out.println(achNum);
		
		String[] parts = achNumParts[1].split("=");
		switch (parts[0]) {
		case "connection": {
			return;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + parts[0]);
		}

	}
	public static void CreatMemberSuccess(Integer userId, Predicate<Integer> p) {
		if(p.test(userId)) {
			
		}
	}
	//도전과제 아이디 가져오기
	public Integer getAchieventId(String achId) {
		try {
			String[] parts = achId.split("=");
			int id =Integer.parseInt(parts[1]);
			return id;
		}catch (NumberFormatException e) {
			e.printStackTrace();
			return null;
		}
		
	}//도전과제 아이디 가져오기

	//도전과제 달성 이벤트
	public boolean AchieventAttainment(int AchNum) {
		return true;
	}

	//public List<AchievenentListVO> selectAchievenentList(){
		
	//}
}
