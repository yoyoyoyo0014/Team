export function setVh(ele){
	let vh = window.innerHeight * 0.01;
	ele.style.setProperty('--vh', `${vh}px`);
}