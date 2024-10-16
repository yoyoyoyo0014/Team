import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

const MypageIndex = () => {
	const user = useContext(LoginContext);
	console.log(user);
	return(
		<div>
			{user.member}
		</div>
	)
}

export default MypageIndex;