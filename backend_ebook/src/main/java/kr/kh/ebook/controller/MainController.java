package kr.kh.ebook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import kr.kh.ebook.service.BookService;

@Controller
public class MainController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("/")
	public String main() {
		return "index";
	}
	
}