import {useState} from 'react';

function Report({user, reportUser,content}) {

  function reportSubmit(){
    if(user == reportUser){
      return;
    }//신고유저가 신고한 유저랑 같을 때 반환
  }

  return (
    <div>

    </div>
  )
}

export default Report;
