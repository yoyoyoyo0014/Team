package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.AchievenentVO;
import kr.kh.ebook.service.AchievenentService;

@Component
@Controller
@RestController
@RequestMapping("/ach")
public class AchievenentController {

	public static AchievenentController instance;

	@Autowired
	AchievenentService achService;
	
	//전체 도전과제 목록
	@GetMapping("/{userId}")
	public HashMap<String, Object> getUserAchivement(@PathVariable String userId){
		HashMap<String, Object> map = new HashMap<String, Object>();
		System.out.println(userId);
		return map;
	}
	
	//새로 달성한 도전과제 반환
	@PostMapping("/selectNewAchList/{meId}")
	public HashMap<String, Object> selectNewAchievenentList(@PathVariable String meId){
		List<AchievenentVO> list = achService.selectNewAchList(meId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("myAchList", list);
		for(AchievenentVO tmp : list)
			achService.updateCheckAch(tmp.getAc_num(), meId);
		return map;
	}
}