package kr.kh.ebook.main;

//import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// @MapperScan(basePackages = "kr.kh.ebook.dao")
@ComponentScan(basePackages = "kr.kh.ebook")
public class BackendEbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendEbookApplication.class, args);
	}

}
