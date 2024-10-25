import Modal from 'react-modal';
import {useEffect,useState} from 'react';
import React, { Component, createContext,useContext } from 'react';
import { AchievenentEventContext } from './AchieventContext';

//도전과제 가져오기
export async function SelectNowColleactAchData(meId) {
  try{
    const response = await fetch('/ach/selectNowCollectAchList/'+meId,{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

//도전과제 이벤트 후 표시 확인
export async function CheckColleactAchData(achListData) {
  try{
    const response = await fetch('/ach/checkCollectAchList',{
      method: 'POST', // POST 메서드 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(achListData), // 데이터를 JSON 문자열로 변환하여 전송
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

//해당 도전과제 가져오기
export async function selectAchievenent(achListData) {
  var intList = []

  for(var i = 0;i<achListData.length;i++){
    intList.push(achListData[i].acl_ac_num)
  }

  try{
    const response = await fetch('/ach/selectAchievenent',{
      method: 'POST', // POST 메서드 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(intList), // 데이터를 JSON 문자열로 변환하여 전송
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

export function AchievenentEvent() {
  const {modalIsOpen, OnAchievenent, OffAchievenent } = useContext(AchievenentEventContext);
  var meId = 'admin123'
  var collectAchList;// 달성한 도전과제 리스트
  let [achData,setAchData] =useState();//달성한 도전과제 데이터
  useEffect(() => {
    (async () => {
      collectAchList =await SelectNowColleactAchData(meId);
      console.log(collectAchList)
      if(collectAchList.length == 0)
        return;
      achData = await selectAchievenent(collectAchList);
      setAchData(achData)
      OnAchievenent();
      await CheckColleactAchData(collectAchList);
    })();
  }, []); //처음 시작할 때

  return (
    <Modal
      isOpen={modalIsOpen} // 상태 값 사용
      onRequestClose={()=>OffAchievenent()} // 함수 전달
      style={{
        overlay: { backgroundColor: 'rgba(1, 1, 1, 0.5)', zIndex: 100 },
        content: { color: 'black', padding: '20px', borderRadius: '8px' },
      }}
    >
      <AchievenentWindow achList={achData} exit={()=>OffAchievenent()} />
    </Modal>
  );
}

export function AchievenentWindow({achList,exit}){
  let [currentAchNum,setCurrentAchNum] = useState(1);
  
  console.log(achList)
  return(
    <div>
      {
        achList && achList.length >= currentAchNum && (
          <>
            <img
              src={'/achievenent/ach_' + currentAchNum + '.jpg'}
              alt={"ach_" + currentAchNum}
              width="50"
              height="75"
            />
            <div>{achList[currentAchNum-1].ac_title}</div>
            <div>{achList[currentAchNum-1].ac_info}</div>
          </>
      )}

      {achList.length > currentAchNum &&(
          <div onClick={setCurrentAchNum(currentAchNum+1)}>다음</div>)}
      {achList.length <= currentAchNum &&(
          <div onClick={exit}>확인</div> )}
    </div>
  )
}
