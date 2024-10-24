import React, { useState } from 'react';

function Update({list, setList, me_id, po_title="", po_content=""}){
	let [title, setTitle] = useState(po_title);
	let [content, setContent] = useState(po_content);

	function btnClick(){
		var view = 0;
		let post = {
			title, writer : me_id, content, view
		}
		setList([post, ...list])
    alert('게시글이 수정되었습니다.');
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
export default Update;
