package kr.kh.ebook.controller;

<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/WriterController.java
import java.util.ArrayList;
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

import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterTypeVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.pagination.Criteria;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.PostService;
import kr.kh.ebook.service.ReportService;
=======
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterTypeVO;
import kr.kh.ebook.model.vo.WriterVO;
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/WriterController.java
import kr.kh.ebook.service.WriterService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class WriterController {

	@Autowired
	WriterService writerService;

	//작가 추가하기
	@GetMapping("/insertWriter/{wr_name}/{wr_profile}")
	public boolean insertWriter(@PathVariable("wr_name") String wrName, @PathVariable("wr_profile") String wrProfile) {
		WriterVO writer = new WriterVO(wrName,wrProfile);
		boolean res = writerService.insertWriter(writer);
		return res;
	}
	//작가가 책을 썼다고 추가하기
	@GetMapping("/insertWriterList/{wr_name}/{bk_num}/{wt_num}")
	public boolean insertWriterBook(@PathVariable("wr_num") int wrNum,@PathVariable("bk_num") int bkNum,@PathVariable("wt_num")int wtNum) {
		WriterListVO writerBook = new WriterListVO(wrNum,bkNum,wtNum);
		boolean res = writerService.insertWriterList(writerBook);
		return res;
	}
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/WriterController.java
	//작가가져오기
	@GetMapping("/selectWriter/{bookNum}")
	public List<WriterVO> selectWriter(@PathVariable("bookNum") int bookNum) {
		List<WriterListVO> bookWriterList = writerService.selectWriterList(bookNum);
		if(bookWriterList == null)
			return null;
		List<WriterVO> res = new ArrayList<WriterVO>();
		for(int i =0;i<bookWriterList.size();i++) {
			WriterVO writer = writerService.selectWriter(bookWriterList.get(i).getWl_wr_num());
			res.add(writer);
		}
		
		return res;
	}
=======
	
	@GetMapping("/selectWriter/{wr_num}")
	public WriterVO selectWriter(@PathVariable("wr_num") int wr_num) {
		WriterVO res = writerService.selectWriter(wr_num);
		return res;
	}
	
	//작가가져오기
	@GetMapping("/selectWriterList/{bookNum}")
	public HashMap<String, Object> selectWriterList(@PathVariable("bookNum") int bookNum) {
		List<WriterVO> writer = writerService.selectWriterList(bookNum);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("writer", writer);
		return map;
	}
	
>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/WriterController.java
	//작가이름으로 검색하기
	@GetMapping("/searchWriter/{page}/{search}")
	@ResponseBody
	public List<WriterVO> searchWriter(@PathVariable("page") int page,@PathVariable("search") String search){
		search = search.replace("Search=", "");
		List<WriterVO> searchList = writerService.searchWriterList(search,page-1);
		System.out.println(searchList);
		return searchList;
	}
<<<<<<< HEAD:eBook/src/main/java/kr/kh/ebook/controller/WriterController.java
	
=======

>>>>>>> KCL:backend_ebook/src/main/java/kr/kh/ebook/controller/WriterController.java
	//작가타입리스트들 가져오기
	@GetMapping("/selectWriterType")
	@ResponseBody
	public List<WriterTypeVO> selectWriterTypeList(){
		List<WriterTypeVO> writerTypeList = writerService.selectWriterTypeList();
		return writerTypeList;
	}

	//작가 이름 검색 개수
	@GetMapping("/searchWriterCount/{search}")
	@ResponseBody
	public int searchWriterCount(@PathVariable("search") String search){
		search = search.replace("Search=", "");
		int searchListCount = writerService.searchWriterListCount(search);
		return searchListCount;
	}
}