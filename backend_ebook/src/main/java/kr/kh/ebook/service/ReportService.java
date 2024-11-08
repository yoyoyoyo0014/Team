package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.ReportDAO;
import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReportVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.ReportCriteria;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class ReportService {
	private ReportDAO reportDao;

	public List<ReportTypeVO> selectReportType() {
		return reportDao.selectReportType();
	}

	public boolean insertReport(ReportVO report) {
		return reportDao.insertReport(report);
	}

	public ReportVO selectReport(String userId, String targetId, String reportId) {
		return reportDao.selectReport(userId,targetId,reportId);
	}
	
	public List<ReportVO> getReportList(ReportCriteria cri) {
        return reportDao.selectReportList(cri);
    }

    public PageMaker getPageMaker(ReportCriteria cri) {
        int totalCount = reportDao.selectCountReportList(cri);
        return new PageMaker(10, cri, totalCount); // 10은 표시할 페이지 수
    }
    
}
