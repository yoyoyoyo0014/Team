package kr.kh.ebook.controller.AchievenentEvent;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import kr.kh.ebook.model.vo.AchievenentListVO;
import kr.kh.ebook.model.vo.AchievenentVO;
import kr.kh.ebook.service.AchievenentService;

@Component
@Controller
@RestController
public class AchievenentListController {
	
	public static AchievenentListController achManager;

	@Autowired 
	public AchievenentService achService;
	
	List<AchievenentVO> achList;
	
	//계정 생성 도전과제
	List<Achievenents> creatAccountList = new ArrayList<Achievenents>();
	//책 구매 도전과제
	List<Achievenents> buyAccountList = new ArrayList<Achievenents>();
	
	@PostConstruct
	void Init() {
		achManager = this;
		
		achList = allAchievenentList();//Achievenent 모두 가져오기
		
		divisionAchievenent();  //람다식 추가
		
		achManager.createAccount();
	}

	//DB에서 해당 도전과제들 불러오기
	@PostMapping("/{anyPath}/selectAchievenent")
	public List<AchievenentVO> selectAchievenent(@RequestBody List<Integer> achNum) {
		List<AchievenentVO> res = new ArrayList<AchievenentVO>();
		
		for(int i =0;i<achNum.size();i++)
			res.add(achService.selectAchievenent(achNum.get(i)));
		
		
		return res;
	}
	
	//DB에서 존재하는 도전과제 전부 가져오기
	public List<AchievenentVO> allAchievenentList(){
		return achService.allAchievenentList();
	}
	
	
	//DB에서 방금 달성한 도전과제 가져오기
	@GetMapping("/{anyPath}/selectNowCollectAchList/{meId}")
	public List<AchievenentListVO> selectNowCollectAchList(@PathVariable String anyPath,@PathVariable String meId){
		List<AchievenentListVO> res = achService.selecNowCollectAchList(meId);
		return res;
	}
	
	//DB에서 달성한 도전과제를 확인했어요
	@PostMapping("/{anyPath}/checkCollectAchList")
	public boolean UpdateCollectAchList(@RequestBody List<AchievenentListVO> achList){
		for(AchievenentListVO ach : achList) {
			if(!achService.updateCheckCollectAchList
					(ach.getAcl_ac_num(),ach.getAcl_me_id())) 
				return false;
		}
		return true;
	}
	
	
	//DB에서 달성한 도전과제 불러오기
	public List<AchievenentListVO> selectAchievenentList(int achNum,String memberId){
		List<AchievenentListVO> achList =  achService.selectAchievenentList(achNum,memberId);
		return achList;
	}
	//DB에서 달성한 도전과제 달성 추가하기
	public boolean insertAchievenentList(int achNum,String memberId) {
		return achService.insertAchList(achNum,memberId);
	}
	
	//도전과제들을 람다식에 넣기
	public void divisionAchievenent() {
		for(AchievenentVO ach : achList) {
			String[] parts = ach.getAc_id().split("=");
			switch(parts[0]) {
			case "creatAccount" :
				insertCreateAccount(ach);
				break;
			}
		}
	}

	void checkAchievenent(List<Achievenents> achList) {
		String id = "admin123";
		for (Achievenents i : achList) {
			if(selectAchievenentList(1,"admin123").size()!=0) 
				return;
				
			if(i.CheckAchievenent.checkAccount()) 
				insertAchievenentList(i.achievenentVo.getAc_num(),id);
		}
	}

	//계정 생성 시 달성 도전과제
	public void createAccount() {
		checkAchievenent(creatAccountList);
	}

	//계정 생성 도전과제 추가
	public void insertCreateAccount(AchievenentVO ach) {
		Achievenents achievenents = new Achievenents();
		CheckAchievenent checkEvent = () ->{
			return true;
		};
		achievenents.CheckAchievenent = checkEvent;
		achievenents.achievenentVo = ach;
		creatAccountList.add(achievenents);
	}


	public  void buyBook() {

	}
	
}


