import Modal from 'react-modal';
import {useEffect,useState} from 'react';
import React, { Component, createContext,useContext } from 'react';
import { AchievenentEventContext } from './AchieventContext';
import { LoginContext } from '../../context/LoginContext';

//도전과제 가져오기
export async function SelectNowColleactAchData(meId) {
  console.log("SelectNowColleactAchData")
  try{
    const response = await fetch('/ach/selectNowCollectAchList/'+meId,{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    console.log(meId)
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

//도전과제 이벤트 후 표시 확인
export async function CheckColleactAchData(achListData) {
  console.log(achListData)
  try{
    const response = await fetch('/ach/checkCollectAchList',{
      method: 'POST', // POST 메서드 설정
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
      body: JSON.stringify(achListData.nowCollectAchList), // 데이터를 JSON 문자열로 변환하여 전송
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

//해당 도전과제 가져오기
export async function SelectAchievenent(achListData) {
  var intList = []

  for(var i = 0;i<achListData.nowCollectAchList.length;i++){
    intList.push(achListData.nowCollectAchList[i].acl_ac_num)
  }
  console.log("asdasdsad")
  console.log(achListData)
  console.log(intList)
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

export function AchievenentEvent({meId}) {
  const {modalIsOpen, OnAchievenent, OffAchievenent } = useContext(AchievenentEventContext);
  

  var collectAchList;// 달성한 도전과제 리스트
  let [achData,setAchData] =useState();//달성한 도전과제 데이터
  useEffect(() => {
    (async () => {
      if(!meId)
        return;
      collectAchList =await SelectNowColleactAchData(meId);
      console.log("collectAchList")
      console.log(collectAchList)
      if(collectAchList.nowCollectAchList.length === 0)
        return;
      achData = await SelectAchievenent(collectAchList);
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