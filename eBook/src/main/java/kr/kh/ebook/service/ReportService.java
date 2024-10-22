package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.dao.ReportDAO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReportVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.PageMaker;
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
}
