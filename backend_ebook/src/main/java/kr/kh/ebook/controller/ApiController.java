package kr.kh.ebook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class ApiController {
	
	@GetMapping("/test")
	@ResponseBody
	public String test() {
		return "test";
	}
}
