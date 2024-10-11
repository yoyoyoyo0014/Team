package kr.kh.ebook.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.kh.ebook.model.vo.ReportTypeVO;
import kr.kh.ebook.service.BookService;
import kr.kh.ebook.service.ReportService;

@Controller
public class MainController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("/")
	public String main() {
		System.out.println(bookService.selectBook(2));
		return "index";
	}
		
}