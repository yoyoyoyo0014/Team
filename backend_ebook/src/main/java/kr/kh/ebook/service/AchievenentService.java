package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.AchievenentDAO;
import kr.kh.ebook.dao.BookDAO;
import kr.kh.ebook.model.vo.BookListVO;
import kr.kh.ebook.model.vo.BookSecondGenreVO;
import kr.kh.ebook.model.vo.BookVO;
import kr.kh.ebook.model.vo.BookGenreVO;
import kr.kh.ebook.model.vo.ReviewVO;
import kr.kh.ebook.model.vo.WriterListVO;
import kr.kh.ebook.model.vo.WriterVO;
import kr.kh.ebook.pagination.BookPageMaker;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AchievenentService {

	AchievenentDAO achDao;
}
