package kr.kh.ebook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.kh.ebook.dao.PostDAO;
import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class PostService {
	private PostDAO postDao;

	public List<PostVO> getPostList(int co_num) {
		return postDao.selectPostList(co_num);
	}

	public List<CommunityVO> getCommunityList() {
		return postDao.selectCommuniyList();
	}
	
	
}
