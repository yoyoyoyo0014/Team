package kr.kh.ebook.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.WriterService;

@RequestMapping("/ebook")
@RestController
public class BookContoller {
	
	@Autowired
	BookService bookService;
	@Autowired
	WriterService writerService;
	
	//책 번호를 통해 책 정보 가져오기
	@GetMapping("/selectBook/{bookNum}")
	@ResponseBody
	public HashMap<String, Object> selectBookPost(@PathVariable("bookNum") int bookNum) {
		BookVO book = bookService.selectBook(bookNum);
		List<WriterVO> writer = writerService.selectWriterList(bookNum);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("book", book);
		map.put("writer", writer);
		return map;
	}//책 번호를 통해 책 정보 가져오기
	
	//책 검색
	@GetMapping("/searchBook")
	@ResponseBody
	public HashMap<String, Object> searchBookList(@PathVariable String category,
			@PathVariable String country, @PathVariable int genre,
			@PathVariable String search, @PathVariable int page) {
		//https://github.com/st8324/java_240528/blob/main/spring%20projects/spring3/src/main/java/kr/kh/spring3/controller/ReactController.java
		BookCriteria bookCri = new BookCriteria(page, category, country, genre, search);
		BookPageMaker pm = new BookPageMaker(5, bookCri);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		List<BookVO> list = bookService.searchBookList(pm);

		map.put("bookList", list);
		return map;
	}
	
	//책 검색 개수만
	@PostMapping("/searchBookCount/{country}/{genre}/SearchWord={search}")
	@ResponseBody
	public int selectBookCount(@PathVariable String country,
			@PathVariable int genre,
			@PathVariable String search) {
		
		if(search.equals("doNotExist"))
			search = "";
		int searchBookCount = bookService.searchBookCount(country,genre,search);
		return searchBookCount;
	}
	
	//읽고 있는책 현재 페이지 : 구매하지 않았다면 -1
	@PostMapping("/currentBookPage")
	public int selectReadBook(@RequestParam int bookNum,@RequestParam String userId) {
		try {
			 BookListVO readBook = bookService.selectReadBook(bookNum,userId);
			 if(readBook==null)
				 return -1;//구매하지 않은 책
			return readBook.getBl_nowPage();
		}catch(Exception e) {
			return 1;
		}//혹시 여러개 있음을 방지
	}
	
	//읽고 있는 책 완독률 저장
	@PostMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}
	

//	@GetMapping("/selectGenreList")
//	@ResponseBody
//	public List<BookGenreVO> selectGenreList(){
//		List<BookGenreVO> res = bookService.getAllGenre();
//		return res;
//	}
//
//	//두번째 장르 가져오기
//	@GetMapping("/selectSecondGenreList")
//	@ResponseBody
//	public List<BookGenreVO> selectSecondGenreList(int parent){
//		List<BookGenreVO> res = bookService.getSecondGenre(parent);
//		return res;
//	}
	
}