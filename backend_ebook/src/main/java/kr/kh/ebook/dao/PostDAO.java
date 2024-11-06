package kr.kh.ebook.dao;

import java.util.List;

import kr.kh.ebook.model.vo.CommunityVO;
import kr.kh.ebook.model.vo.PostVO;
import kr.kh.ebook.pagination.PostCriteria;

public interface PostDAO {

	List<PostVO> selectPostList(PostCriteria cri);

	List<CommunityVO> selectCommuniyList();

	int selectCountPostList(PostCriteria cri);

	boolean insertPost(PostVO post);

	PostVO selectPost(int po_num);
	
	boolean updatePost(PostVO post);

	boolean deletePost(int po_num);

	int updatePostView(int po_num);
	
	
}
