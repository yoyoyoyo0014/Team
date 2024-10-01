package kr.kh.ebook.dao;

import java.util.List;

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;

public interface PostDAO {

	List<PostVO> selectPostList(int co_num);

	List<CommunityVO> selectCommuniyList();
	
	
}
