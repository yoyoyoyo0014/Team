import React from 'react';

function PostInsert({list, setList, me_id}){
	let [title, setTitle] = useState(po_title || "");
	let [content, setContent] = useState(po_content || "");

	function btnClick(){
		var view = 0;
		let post = {
			title, writer : me_id, content, view
		}
		setList([post, ...list])
		setTitle('');
		setContent('');
	}

	return(
		<div>
			<input type="text" id="title" name="title" placeholder="제목을 입력하세요." onChange={(e)=>setTitle(e.target.value)} value={title}/>
			<input type="text" id="writer" name="writer" value={me_id} readOnly/>
			<textarea id="content" name="content" placeholder="내용을 입력하세요." onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
			<button className="btn" onClick={btnClick}>게시글 수정</button>
		</div>
	)
}
export default PostInsert;