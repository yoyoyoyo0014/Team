package kr.kh.ebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReportVO;
import kr.kh.ebook.service.ReportService;

@RestController
@RequestMapping("/report")
//@Controller
public class ReportController {
	@Autowired
	ReportService reportService;
	
	//리폿타입 가져오기
	@GetMapping("/selectReportType")
	@ResponseBody
	public List<ReportTypeVO> selectReportTypeList() {
	    List<ReportTypeVO> reportTypeList = reportService.selectReportType();
	    System.out.println(reportTypeList);
	    return reportTypeList;
	}
	
	//신고 추가하기
	@GetMapping("/insertReport/{meId}/{targetId}/{rtNum}/{rpId}/{reportContent}")
	@ResponseBody
	public boolean insertReport(@PathVariable("meId") String meId,@PathVariable("targetId") String targetId,
			@PathVariable("rtNum") int rtNum,@PathVariable("rpId")String rpId,@PathVariable("reportContent")String reportContent) {
		//System.out.println(meId + targetId + rpNum);
		ReportVO report = new ReportVO(meId,targetId,rtNum,rpId,reportContent);
		return reportService.insertReport(report);
	}
	//신고 추가하기
	@GetMapping("/existReport/{userId}/{targetId}/{reportId}")
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