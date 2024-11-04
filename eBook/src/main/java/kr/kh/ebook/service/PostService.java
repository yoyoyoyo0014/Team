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

	public List<PostVO> getMyPostList(PostCriteria cri, String userId) {
		return postDao.selectMyPostList(cri, userId);
	}
	
	public PageMaker getPageMaker(PostCriteria cri) {
		int count = postDao.selectCountPostList(cri);
		return new PageMaker(3, cri, count);
	}
	
	public PostVO getPost(int po_num) {
		return postDao.selectPost(po_num);
	}

	public boolean addPost(PostVO post) {
		if(post == null) {
			return false;
		}
		try {			
			return postDao.insertPost(post);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean updatePost(PostVO post) {
		if(post == null) {
			return false;
		}
		try {			
			return postDao.updatePost(post);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean deletePost(int po_num) {
		return postDao.deletePost(po_num);
	}
	
	
}
