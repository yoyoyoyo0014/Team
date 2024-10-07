package kr.kh.ebook.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "kr.kh.ebook	")
public class BackendEbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendEbookApplication.class, args);
	}

}
