package kr.kh.ebook.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.service.BookService;

@RequestMapping("/")
@RestController
public class MainController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("/main")
	public HashMap<String, Object> main() {
		List<BookGenreVO> dbList = bookService.getAllGenre();
		
		List<List<BookGenreVO>> list = new ArrayList<>();
		
		for (int i = 0; i < dbList.size(); i++) {
			List<BookGenreVO> secondGenreList = bookService.getSecondGenre(dbList.get(i).getGe_num());
			List<BookGenreVO> tmpList = new ArrayList<BookGenreVO>();
			for(int j = 0; j < secondGenreList.size(); j++) {
				tmpList.add(secondGenreList.get(j));
			}
			list.add(tmpList);
		}
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("majorGenreList", dbList);
		map.put("genreList", list);
		return map;
	}
	
	@PostMapping("/main")
	public HashMap<String, Object> mainPost(@RequestParam String section){
		section = section.toString();
		
		List<BookVO> list = null;
		if (section.equals("bestSellers"))
			list = bookService.getBestSellers();
		else
			list = bookService.getNewBooks();
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		System.out.println(section);
		System.out.println(section.getClass());
		for(BookVO tmp : list) {
			System.out.println(tmp);
		}
		map.put("list", list);
		return map;
	}
}