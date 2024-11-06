import '../css/slide.css';

const Slide = ({list}) => {
	const w = 640;
	let index = 0;

	const prev = () => {
		if (index === 0) index = list.length - 1;
		else index--;
		move(index);
	}
	const next = () => {
		if (index === list.length - 1) index = 0;
		else index++;
		move(index);
	}
	const move = (index) => {
		const ul = document.querySelector('.slide-ul');
		ul.style.marginLeft = -w * index + 'px';
		document.querySelector('.indicator .now').classList.remove('now');
		document.querySelector('.indicator :nth-child('+(index+1)+')').classList.add('now');
	}

	const indicatorClic = (item, i)=>{
		document.querySelector('.now').classList.remove('now');
		document.querySelector('.indicator :nth-child('+(i+1)+')').classList.add('now');
		index = i;
		move(index);
	}
	return(
		<div className="slide">
			<div className="prev slide-btn" onClick={prev}>
				<i className="fa-solid fa-chevron-left"></i>
			</div>
			<div className="slide-wrapper" style={{width: w + 'px'}}>
				<ul className="slide-ul" style={{width: w * list.length + 'px'}}>
					{list.map((item, i) => {
						return(
							<li key={i} style={{width: w + 'px'}}><img src={item} alt="test"/></li>
						);
					})}
				</ul>
			</div>
			<div className="next slide-btn" onClick={next}>
				<i className="fa-solid fa-chevron-right"></i>
			</div>
			<ul className="indicator">
				{
					list.map((item, i)=>{
						return (
							<li key={i} onClick={(e)=>indicatorClic(e,i)} className={i==0?'now' : ''}></li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default Slide;