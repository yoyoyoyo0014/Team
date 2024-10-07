package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.PostDAO;
import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.PageMaker;
import kr.kh.ebook.pagination.PostCriteria;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class PostService {
	private PostDAO postDao;

	public List<PostVO> getPostList(PostCriteria cri) {
		return postDao.selectPostList(cri);
	}

	public List<CommunityVO> getCommunityList() {
		return postDao.selectCommuniyList();
	}

	public PageMaker getPageMaker(PostCriteria cri) {
		int count = postDao.selectCountPostList(cri);
		return new PageMaker(3, cri, count);
	}
	
	
}
