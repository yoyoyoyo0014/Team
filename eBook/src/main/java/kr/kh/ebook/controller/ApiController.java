package kr.kh.ebook.contoller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class ApiController {
	//https://www.nl.go.kr/NL/search/openApi/search.do?key=aee1180cf50fe754ec0965bdab10a875b7335aeb32b484491df679316dce5820&detailSearch=true&isbnOp=isbn&isbnCode=510&sort=ititle
	@GetMapping(value ="/searchBookIsbn/{page}/{search}" , produces="application/text; charset=UTF-8;")
	@ResponseBody
	public String test(@PathVariable("page") String page,@PathVariable("search") String search) throws Exception {
		System.out.println(page+search);
		StringBuilder urlBuilder = new StringBuilder("https://www.nl.go.kr/NL/search/openApi/search.do"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("key","UTF-8") + "=aee1180cf50fe754ec0965bdab10a875b7335aeb32b484491df679316dce5820"); /*Service Key*/

        urlBuilder.append("&" + URLEncoder.encode("detailSearch","UTF-8") + "=" + URLEncoder.encode("true", "UTF-8")); /*xml 또는 json*/
        urlBuilder.append("&" + URLEncoder.encode("isbnOp","UTF-8") + "=" + URLEncoder.encode("isbn", "UTF-8")); /*xml 또는 json*/
        urlBuilder.append("&" + URLEncoder.encode("isbnCode","UTF-8") + "=" + URLEncoder.encode(search, "UTF-8")); /* 페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("pageNum","UTF-8") + "=" + URLEncoder.encode(page, "UTF-8")); /*한 페이지 결과 수(조회 날짜로 검색 시 사용 안함)*/
        //urlBuilder.append("&" + URLEncoder.encode("pageSize","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*xml 또는 json*/
        urlBuilder.append("&" + URLEncoder.encode("apiType","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml 또는 json*/
        urlBuilder.append("&" + URLEncoder.encode("sort","UTF-8") + "=" + URLEncoder.encode("ititle", "UTF-8")); /*xml 또는 json*/
        
//        urlBuilder.append("&" + URLEncoder.encode("category","UTF-8") + "=" + URLEncoder.encode("도서", "UTF-8")); /*xml 또는 json*/
//        urlBuilder.append("&" + URLEncoder.encode("systemType ","UTF-8") + "=" + URLEncoder.encode("온라인자료", "UTF-8")); /*xml 또는 json*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        return sb.toString();
	}
}
