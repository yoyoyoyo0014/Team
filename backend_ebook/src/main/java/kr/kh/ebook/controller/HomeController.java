package kr.kh.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import kr.kh.ebook.dao.BookDAO;

@Controller
public class HomeController {

	@Autowired
	BookDAO bookDao;
	
	@GetMapping("/")
	public String main() {
		
		System.out.println(bookDao.count());
		
		return "index";
	}
	
}
