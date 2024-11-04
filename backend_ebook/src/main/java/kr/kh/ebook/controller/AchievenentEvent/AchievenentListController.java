package kr.kh.ebook.controller.AchievenentEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import kr.kh.ebook.model.vo.AchievenentListVO;
import kr.kh.ebook.model.vo.AchievenentVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.service.AchievenentService;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.MemberService;

@Component
@Controller
@RestController
@RequestMapping("/ach")
public class AchievenentListController {

	public static AchievenentListController instance;

	@Autowired
	AchievenentService achService;
	
	@Autowired
	BookService bookService;
	
	@Autowired
	MemberService memberService;
	
	//도전과제 목록
	List<AchievenentVO> achList;

	//계정 생성 도전과제
	List<Achievenents> creatAccountList = new ArrayList<Achievenents>();
	//책 구매 도전과제
	List<Achievenents> buyAccountList = new ArrayList<Achievenents>();

	@PostConstruct
	void Init() {
		instance = this;
		//db에서 모든 도전과제 가져오기
		achList = allAchievenentList();
		//도전과제 확인 이벤트 추가
		divisionAchievenent();
		//책을 하나 구매 시  달성되는 도전과제 테스트로 추가
		instance.buyBook("testcpn22", null);
	}

	private List<AchievenentVO> allAchievenentList() {
		return achService.allAchievenentList();
	}

	//해당 도전과제들 불러오기
	@PostMapping("/selectAchievenent")
	public List<AchievenentVO> selectAchievenent(@RequestBody List<Integer> achNum) {
		List<AchievenentVO> res = new ArrayList<AchievenentVO>();
		for(int i =0;i<achNum.size();i++)
			res.add(achService.selectAchievenent(achNum.get(i)));
		return res;
	}

	/**
	 * 모든 도전과제 목록 반환
	 * @return 도전과제 목록 반환
	 */
	@GetMapping("/getMyAchs/{userId}")
	public HashMap<String, Object> getUserAchivement(@PathVariable String userId){
		HashMap<String, Object> map = new HashMap<String, Object>();
		List<AchievenentVO> list = achService.getUserAchivement(userId);
		System.out.println(list);
		System.out.println(userId);
		map.put("myAchList", list);
		return map;
	}
	
	//방금 달성한 도전과제 가져오기
	@GetMapping("/selectNowCollectAchList/{meId}")
	public HashMap<String, Object> selectNowCollectAchList(@PathVariable String meId){
		List<AchievenentListVO> list = achService.selecNowCollectAchList(meId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("nowCollectAchList", list);
		return map;
	}

	//달성한 도전과제를 확인했어요
	@PostMapping("/checkCollectAchList")
	public boolean UpdateCollectAchList(@RequestBody List<AchievenentListVO> achList){
		for(AchievenentListVO ach : achList) {
			if(!achService.updateCheckCollectAchList
					(ach.getAcl_ac_num(),ach.getAcl_me_id())) 
				return false;
		}
		return true;
	}


	//해당 도전과제가 달성했는지 안했는지
	public List<AchievenentListVO> selectAchievenentList(int achNum,String memberId){
		List<AchievenentListVO> achList =  achService.selectAchievenentList(achNum,memberId);
		return achList;
	}
	//도전과제 달성 추가
	public boolean insertAchievenentList(int achNum,String memberId) {
		return achService.insertAchList(achNum,memberId);
	}

	//도전과제들을 람다식에 넣기
	
	/**
	 * achList에 ac_id를 통해 도전과제 달성 시 true를 반환하는 이벤트 값 추가
	 */
	public void divisionAchievenent() {
		for(AchievenentVO ach : achList) {
			//=을 기준으로 String을 나눔
			String[] parts = ach.getAc_id().split("=");
			switch(parts[0]) {
			//처음 값이 'creatAcount'일 시 실행 (멤버 생성 시 실행하는 메소드)
			case "creatAccount" :
				//계정 생성 도전과제 메소드 추가
				insertCreateAccount(ach);
				break;
			//처음 값이 'buyBookCount'일 시 실행 (책 구매 시 실행하는 메소드)
			case "buyBookCount":
				try {
					//parts[1]은 책 구매 달성 개수
					int count = Integer.parseInt(parts[1]);
					//책 개수 도전과제 메소드 추가
					buyBookCountInsert(ach,count);
					break;
				}catch(Exception e) {
					System.out.println(ach.getAc_num()+"번 도전과제 ac_id 오류 옳은 예) buyBookCount=1");
				}
				
			}
		}
	}

	/**
	 * 도전과제를 달성했는지 안했는지 검사하는 메소드
	 * @param achList 이벤트들을 모아둔 List
	 * @param userId 해당 유저 아이디
	 */
	void checkAchievenent(List<Achievenents> achList,String userId,Object helpConfirmation) {
		if(memberService.getMemberById(userId)==null)
			return;
		for (Achievenents i : achList) {
			//이미 달성한 도전과제면 return
			if(selectAchievenentList(i.achievenentVo.getAc_num(),userId).size()!=0)
				return;
			//checkAccount를 통해 검사
			if(i.CheckAchievenent.checkAccount(userId,helpConfirmation)) 
				//달성 시 실행
				insertAchievenentList(i.achievenentVo.getAc_num(),userId);
		}
	}

	//계정 생성 시 실행되는 메소드
	public void createAccount(String userId) {
		checkAchievenent(creatAccountList,userId,null);
	}

	/**
	 * creatAccountList에 계정 생성시 발생하는 CheckAchievenent 이벤트 추가  
	 * @param ach 도전과제
	 */
	public void insertCreateAccount(AchievenentVO ach) {
		//도전과제 확인을 위한 객체 생성
		Achievenents achievenents = new Achievenents();
		//확인 없이 무조건 true값 반환
		CheckAchievenent checkEvent = (isCreateAccount) ->{
			return true;
		};
		//achievenents에 대입
		achievenents.CheckAchievenent = checkEvent;
		achievenents.achievenentVo = ach;
		//도전과제 목록에 추가
		creatAccountList.add(achievenents);
	}

	/**
	 * creatAccountList에 책 구매시 책 구매 개수에 따라 달성되는 발생하는 CheckAchievenent 이벤트 추가 
	 * @param ach 도전과제
	 * @param count 달성해야하는 개수
	 */
	public void buyBookCountInsert(AchievenentVO ach,int count) {
		//도전과제 확인을 위한 객체 생성
		Achievenents achievenents = new Achievenents();
		CheckAchievenent checkEvent = (Objs) ->{
			try {
				//Objs[0] = 유저 아이디
				String userId = (String) Objs[0];
				//해당 유저의 책 구매 개수
				int buyBookCount = bookService.selectCountBookBuy(userId);
				//책 구매개수를 목표치 만큼 달성시 true 반환
				if(count<=buyBookCount)
					return true;
				//실패시 false 반환
				else 
					return false;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		};
		//achievenents에 대입
		achievenents.CheckAchievenent = checkEvent;
		achievenents.achievenentVo = ach;
		//도전과제 목록에 추가
		creatAccountList.add(achievenents);
	}
	/**
	 * 책 구매 시 실행되는 메소드
	 * @param userId 유저 아이디
	 * @param book 책 구매 시 해당 책
	 */
	public void buyBook(String userId,BookVO book) {
		checkAchievenent(buyAccountList,userId,book);
	}
}