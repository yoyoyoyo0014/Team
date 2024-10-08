export function setVh(){
	let ele = document.getElementById('body');
	let vh = window.innerHeight * 0.01;
	ele.style.setProperty('--vh', `${vh}px`);
}