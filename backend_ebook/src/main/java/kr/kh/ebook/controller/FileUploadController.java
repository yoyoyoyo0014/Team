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
	//path
	static String pathStr = "../fronted_ebook/public/";
	//프로그램 시작시 해당 위치에 폴더가 없을 시 폴더 생성
	static {
		File uploadDir = new File(pathStr);
		if(!uploadDir.exists()) {
			uploadDir.mkdir();
		}
	}

	/**
	 * '../fronted_ebook/public/epub'에는 epub 파일 '../fronted_ebook/public/img'에는 jpj 파일을 업로드
	 * @param bookNum 책 번호
	 * @param file List<MultipartFile>안에 jpg, epub 파일이 있어야 정상 실행
	 * @return 성공시 true 실패 시 false
	 */
	public static boolean uploadFile(int bookNum, List<MultipartFile> file) {
		for(int i =0;i<file.size();i++) {
			//파일 저장 위치
			Path directoryPath;
			//해당 파일에서 확장자를 가져옴
			String fileExtension = getFileExtension(file.get(i).getOriginalFilename());
			//파일명 book_bookNum
			String fileName="book_"+bookNum;
			try {
				//파일 확장자가 epub일 때
				if(fileExtension.equals("epub")) {
					fileName = fileName+".epub";
					//파일 저장 위치를 '../fronted_ebook/public/epub' 에 설정
					String path = pathStr + "epub";
					directoryPath = Paths.get(path);
				}
				//파일 확장자가 jpb일 때
				else {
					fileName = fileName+".jpg";
					//파일 저장 위치를 '../fronted_ebook/public/img' 에 설정
					String path = pathStr + "img";
					directoryPath = Paths.get(path);
				}
				//해당 위치에 폴더가 없을 시 생성
				if (!Files.exists(directoryPath)) {
					Files.createDirectories(directoryPath);
				}
				//파일 업로드
				Path filePath = directoryPath.resolve(fileName);
				Files.write(filePath, file.get(i).getBytes());
			}catch(Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}

	/**
	 * 해당 파일의 확장자를 알고 싶을 때 (ex abc.jpg = jpg)
	 * @param fileName 파일 이름
	 * @return 해당 파일 확장자
	 */
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
