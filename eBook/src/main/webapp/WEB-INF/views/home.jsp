<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script src="https://cdn.iamport.kr/v1/iamport.js"></script>

<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!  
</h1>
<button onclick="requestPay()">카카오톡 결제하기</button>
<script>
IMP.init("imp14397622");

function requestPay() {
  IMP.request_pay({
    pg: "kakaopay.TC0ONETIME",
    pay_method: "card",
    customer_uid: "asdasdasd",
    name: "테스트 결제",
    amount: 100,
    buyer_tel: "010-0000-0000",
  });
}
</script>
<P>  The time on the server is ${serverTime}. </P>
</body>
</html>
