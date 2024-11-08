package kr.kh.ebook.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReportVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.ReportCriteria;


public interface ReportDAO {

	List<ReportTypeVO> selectReportType();

	boolean insertReport(@Param("re") ReportVO report);

	ReportVO selectReport(@Param("userId") String userId, 
			@Param("targetId")String targetId, 
			@Param("reportId")String reportId);
	
	List<ReportVO> selectReportList(ReportCriteria cri);
    int selectCountReportList(ReportCriteria cri);
	
}
