package kr.kh.ebook.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReportVO;
import kr.kh.ebook.service.ReportService;

//@RestController
@Controller
public class ReportController {
	@Autowired
	ReportService reportService;
	
	//리폿타입 가져오기
	@GetMapping("/{anyPath}/selectReportType")
	@ResponseBody
	public List<ReportTypeVO> selectReportTypeList() {
	    List<ReportTypeVO> reportTypeList = reportService.selectReportType();
	    System.out.println(reportTypeList);
	    return reportTypeList;
	}
	
	//신고 추가하기
	@PostMapping("/{anyPath}/report/insertReport")
	@ResponseBody
	public boolean insertReport(@RequestBody ReportVO report) {
		return reportService.insertReport(report);
	}
	//신고 추가하기
	@GetMapping("/{anyPath}/report/existReport/{userId}/{targetId}/{reportId}")
	@ResponseBody
	public boolean selectReportid(@PathVariable("userId") String userId,
			@PathVariable("targetId") String targetId,
			@PathVariable("reportId") String reportId) {
		
		ReportVO rv= reportService.selectReport(userId,targetId,reportId);
		if(rv == null)
			return false;
		
		return true;
	}
	
	
}
