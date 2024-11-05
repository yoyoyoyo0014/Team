package kr.kh.ebook.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.WriterListVO;
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

	// 책 번호를 통해 책 정보 가져오기
	@GetMapping("/selectBook/{bookNum}")
	@ResponseBody
	public HashMap<String, Object> selectBookPost(@PathVariable("bookNum") int bookNum) {
		BookVO book = bookService.selectBook(bookNum);
		List<WriterVO> writer = writerService.selectWriterList(bookNum);

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("book", book);
		map.put("writer", writer);
		return map;
	}// 책 번호를 통해 책 정보 가져오기

	// 책 검색 개수만
	@PostMapping("/count/{country}/{genre}/SearchWord={search}")
	@ResponseBody
	public int selectBookCount(@PathVariable String country, @PathVariable int genre, @PathVariable String search) {

		if (search.equals("doNotExist"))
			search = "";
		int searchBookCount = bookService.searchBookCount(country, genre, search);
		return searchBookCount;
	}

	// 읽고 있는책 현재 페이지 : 구매하지 않았다면 -1
	@PostMapping("/currentBookPage")
	public int selectReadBook(@RequestParam int bookNum, @RequestParam String userId) {
		try {
			BookListVO readBook = bookService.selectReadBook(bookNum, userId);
			if (readBook == null)
				return -1;// 구매하지 않은 책
			return readBook.getBl_nowPage();
		} catch (Exception e) {
			return 1;
		} // 혹시 여러개 있음을 방지
	}

	// 읽고 있는 책 완독률 저장
	@PostMapping("/updateBookPage")
	public boolean updateBookPage(@RequestParam BookListVO readBook) {
		return bookService.updateReadBook(readBook);
	}

	// 책 추가 기능
	@PostMapping("/insertBook")
	public boolean InsertBook(@RequestPart("bk_img") MultipartFile imgFile,
			@RequestPart("bk_epub") MultipartFile epubFile, @RequestPart("bk_data") String bookVo,
			@RequestPart("writerList") String writerListStr) throws JSONException {
		try {
			// JSON 문자열을 List<WriterListVO>로 변환
			ObjectMapper writerListMapper = new ObjectMapper();
			// JSON 문자열을 BookVO로 변환
			ObjectMapper bookMapper = new ObjectMapper();

			List<WriterListVO> writerList = writerListMapper.readValue(writerListStr,
					new TypeReference<List<WriterListVO>>() {
					});
			BookVO book = bookMapper.readValue(bookVo, new TypeReference<BookVO>() {
			});

			// 책의 epub, 표지 파일 담을 객체
			List<MultipartFile> fileList = new ArrayList<MultipartFile>();
			// 책 표지, epub 파일 추가
			fileList.add(imgFile);
			fileList.add(epubFile);

			// 책을 DB에 추가,book 객체에 bk_num 값 가져오는 기능 실패시 return
			if (bookService.insertBook(book)) {
				bookService.insertBookFiles(epubFile, imgFile, book.getBk_num());
			} else
				return false;

			for (int i = 0; i < writerList.size(); i++) {
				writerList.get(i).setWl_bk_num(book.getBk_num());
				if (!bookService.insertWriterList(writerList.get(i))) {
					// DB에 추가했던 책 삭제
					bookService.deleteBook(book.getBk_num());
					// DB에 추가했던 작가리스트 제거
					bookService.deleteWriterList(book.getBk_num());
					return false;
				}
			}
			// EPUB, 책 표지 파일 업로드
			if (FileUploadController.uploadFile(book.getBk_num(), fileList))
				return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	// 책 검색
	@GetMapping("/search/{category}/{country}/{genre}/{count}/SearchWord={search}")
	public List<BookVO> searchBookList(@PathVariable String category, @PathVariable String country,
			@PathVariable int genre, @PathVariable String search, @PathVariable int count) {
		System.out.println("category : " + category + ", country : " + country + ", genre : " + genre + ", search : "
				+ search + ", 페이지 : " + count);
		BookCriteria bookCri = new BookCriteria(count, category, country, genre, search);
		BookPageMaker pm = new BookPageMaker(5, bookCri, count);
		try {
			System.out.println(pm);
			System.out.println(pm.getCri().getSearch());
			List<BookVO> res = bookService.searchBookList(pm);
			System.out.println(res);
			return res;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// 첵꽂이의 책 가져오기
	@GetMapping("/selectBookList/selectBookshelfPage/{userId}/{bookNum}")
	@ResponseBody
	public int selectBookshelfPage(@PathVariable("userId") String userId, @PathVariable("bookNum") int bookNum) {
		Integer page = bookService.selectMyBookPage(userId, bookNum);
		if (page == null)
			page = 0;
		return page;
	}

	/**
	 * @param userId 유저 아이디
	 * @return 해당 유저가 구매한 책 개수 반환
	 */
	public int bookBuyCount(String userId) {
		return bookService.selectCountBookBuy(userId);
	}
}