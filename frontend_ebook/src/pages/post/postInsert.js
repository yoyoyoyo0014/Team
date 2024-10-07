import React from 'react';

function PostInsert({list, setList}){
	let [title, setTitle] = useState("");
	let [writer, setWriter] = useState("");
	let [content, setContent] = useState("");

	function btnClick(){
		var view = 0;
		let post = {
			title, writer, content, view
		}
		setList([post, ...list])
		setTitle('');
		setWriter('');
		setContent('');
	}

	return(
		<div>
			<input type="text" id="title" name="title" placeholder="제목을 입력하세요." onChange={(e)=>setTitle(e.target.value)} value={title}/>
			<input type="text" id="writer" name="writer" placeholder="작성자를 입력하세요." onChange={(e)=>setWriter(e.target.value)} value={writer}/>
			<textarea id="content" name="content" placeholder="내용을 입력하세요." onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
			<button className="btn" onClick={btnClick}>게시글 등록</button>
		</div>
	)
}
export default PostInsert;