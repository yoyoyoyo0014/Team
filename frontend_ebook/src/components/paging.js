import Button from "./form/button";

const Paging = ({pm, page, setPage, load}) => {
	const movePage = () => {
		document.querySelector('.paging-btn.now').classList.remove('now');
		document.querySelector('.num_' + page).classList.add('now');
		load();
	}
	return (<>
		{pm.endPage ?
			<div className="ui-paging txt-center">
				{pm.prev ?
				<Button type="button" text={<i class="fa-solid fa-chevron-left"></i>} cls="paging-btn prev"
				click={() => {
					if(page > 1)
						setPage(--page);
					movePage();
				}}/> : ''}
				<div className="nums">
					{Array(pm.endPage - pm.startPage + 1).fill(0).map((n, i) => {
						return (<Button type="button" cls={"paging-btn num num_" + (i + 1) + " " + (pm.cri.page === i + 1 ? "now" : "")} text={i + 1} click={(e) => {
							setPage(i + 1);
							document.querySelector('.paging-btn.now').classList.remove('now');
							e.target.classList.add('now');
						}}/>)
					})}
				</div>
				{pm.next ?
				<Button type="button" text={<i class="fa-solid fa-chevron-right"></i>} cls="paging-btn next"
				click={() => {
					if (page < pm.cri.endPage)
						setPage(++page);
					movePage();
				}}/> : ''}
			</div>
			: null
		}</>)
}

export default Paging;