<<<<<<< HEAD
export function setVh(){
=======
export const setVh = () => {
>>>>>>> KCL
	let ele = document.getElementById('body');
	let vh = window.innerHeight * 0.01;
	ele.style.setProperty('--vh', `${vh}px`);
}

// const insertCart = ({options}) => {
// 	let data;
// 	axios(options)
// 	.then(res => {
// 		data = res.res;
// 	})
// 	.catch(error => {
// 		if (error.response) {
// 			console.log(error.response.status);
// 		} else if (error.request) {
// 			console.log(error.request);
// 		} else {
// 			console.log('Error', error.message);
// 		}
// 	})

// 	return data;
// }

// export {setVh};