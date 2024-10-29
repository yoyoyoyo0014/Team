package kr.kh.ebook.controller;

import java.io.File;
import java.nio.file.Files;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
public class FileUploadController {
	private static final String EPUB_DIR = "epub";
	private static final String IMG_DIR = "img";
	static {
		File uploadDir = new File(EPUB_DIR);
		if(!uploadDir.exists()) {
			uploadDir.mkdir();
		}
	}
	@PostMapping("/test")
	public String test(@RequestBody String Test) {
		System.out.println(Test);
		return "성공적"+Test;
	}


	public static boolean uploadFile(int bookNum, List<MultipartFile> file) {
		
		String pathStr = "../fronted_ebook/public/";

		for(int i =0;i<file.size();i++) {
			pathStr = "../fronted_ebook/public/";
			Path directoryPath;
			String fileExtension = getFileExtension(file.get(i).getOriginalFilename());//파일 유형
			String fileName="book_"+bookNum;
			try {
				if(fileExtension.equals("epub")) {
					fileName = fileName+".epub";
					pathStr+="epub";
					directoryPath = Paths.get(pathStr);
				}else {
					fileName = fileName+".jpg";
					pathStr+="img";
					directoryPath = Paths.get(pathStr);
				}
				if (!Files.exists(directoryPath)) {
					Files.createDirectories(directoryPath);
				}
				Path filePath = directoryPath.resolve(fileName);//file.get(i).getOriginalFilename());
				Files.write(filePath, file.get(i).getBytes());
			}catch(Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}

	// 파일 확장자를 추출하는 함수
	private static String getFileExtension(String fileName) {
		if (fileName == null) {
			return null;
		}
		int lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex == -1) {
			return "";  // 확장자가 없는 경우 빈 문자열 반환
		}
		return fileName.substring(lastDotIndex + 1);
	}
}
