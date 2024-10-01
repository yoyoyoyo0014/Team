package kr.kh.ebook.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*")
public class HomeController {

	@GetMapping("/ex")
	public String main() {
		
		return "Hello from Spring Boot!";
	}
	
}
