package kr.kh.ebook.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookSecondGenreVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.pagination.BookCriteria;
import kr.kh.ebook.pagination.BookPageMaker;
import kr.kh.ebook.service.BookService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class SearchBookController {

	@Autowired
	BookService bookService;

	//책 번호를 통해 책 정보 가져오기
	@GetMapping("/selectBook/{bookNum}")
	public BookVO selectBook(@PathVariable("bookNum") int bookNum) {
		return bookService.selectBook(bookNum);
	}

	//책 검색
	@GetMapping("/searchBook/{category}/{country}/{genre}/{count}/SearchWord={search}")
	public List<BookVO> searchBookList(@PathVariable String category,
			@PathVariable String country,@PathVariable int genre,
			@PathVariable String search,
			@PathVariable int count) {
		//https://github.com/st8324/java_240528/blob/main/spring%20projects/spring3/src/main/java/kr/kh/spring3/controller/ReactController.java

		BookCriteria bookCri = new BookCriteria(count,category,country,genre,search);
		BookPageMaker pm = new BookPageMaker(5, bookCri, count);
		try {
			List<BookVO> res = bookService.searchBookList(pm);
			return res;
		} catch (Exception e) {
			return null;
		}

	}

	//책 검색 개수만
	@GetMapping("/searchBookCount/{country}/{genre}/SearchWord={search}")
	public int selectBookCount(@PathVariable String country,
			@PathVariable int genre,
			@PathVariable String search) {

		int searchBookCount = bookService.searchBookCount(country,genre,search);
		return searchBookCount;
	}

	//리뷰 개수
	@GetMapping("/{anyPath}/reviewCount/{bookNum}")
	public int reviewCount(@PathVariable("bookNum")int bookNum){
		int res = bookService.reviewCount(bookNum);
		return res;
	}//리뷰 보기

	//리뷰 리스트
	@GetMapping("/{anyPath}/reviewList/{bookNum}/{pageNum}")

	public List<ReviewVO> reviewList(@PathVariable("bookNum")int bookNum, @PathVariable("pageNum") int pageNum){
		List<ReviewVO> res = bookService.selectReviewList(bookNum,pageNum);
		return res;
	}//리뷰 보기

	//읽고 있는책 현재 페이지    구매하지 않았다면 -1
	@GetMapping("/currentBookPage")
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
	@GetMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}

	//장르 리스트 가져오기
	@GetMapping("/selectGenreList")
	@ResponseBody
	public List<BookGenreVO> selectGenreList(){
		List<BookGenreVO> res = bookService.selectGenreList();
		return res;
	}

	//두번째 장르 가져오기
	@GetMapping("/selectSecondGenreList")
	@ResponseBody
	public List<BookSecondGenreVO> selectSecondGenreList(){
		List<BookSecondGenreVO> res = bookService.selectSecondGenreList();
		return res;
	}

	@PostMapping("/insertBook")
	public boolean InsertBook(@RequestPart("bK_img") MultipartFile imgFile,@RequestPart("bK_epub") MultipartFile epubFile,
			@RequestPart("bk_data") String bookVo, @RequestPart("writerList") String writerListStr ) throws JSONException {

		// Jackson ObjectMapper 생성
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectMapper bookMapper = new ObjectMapper();
		try {
			// JSON 문자열을 List<WriterListVO>로 변환
			List<WriterListVO> writerList = objectMapper.readValue(writerListStr, new TypeReference<List<WriterListVO>>() {});
			BookVO book= bookMapper.readValue(bookVo, new TypeReference<BookVO>() {});
			// 변환된 객체 출력
			List<MultipartFile> fileList =new ArrayList<MultipartFile>();
			fileList.add(imgFile);
			fileList.add(epubFile);
			
			bookService.insertBook(book);
			
			System.out.println("bk NUM : "+ book.getBk_num());
			for(int i=0;i<writerList.size();i++) {
				writerList.get(i).setWl_bk_num(book.getBk_num());
				if(!bookService.insertWriterList(writerList.get(i))) {
					return false;
				}
				
			}
			if(FileUploadController.uploadFile(book.getBk_num(), fileList))
				return true;
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}



		return true;
	}
}