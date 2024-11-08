import Modal from 'react-modal';
import {useEffect,useState} from 'react';
import React, { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import axios from 'axios';

export function AchievenentEvent() {
  const {user} = useContext(LoginContext);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  let [achList,setAchList] = useState([]); //달성한 도전과제 데이터
  useEffect(() => {
    axios({
      url: '/ach/selectNewAchList/' + user?.me_id,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      }
    }).then(res => {
      setAchList(res.data.myAchList);
      // if(achList.length === 0) setModalIsOpen(false);
    });
  }, [setAchList]); //처음 시작할 때

  return (
    <Modal
      className="theme-box"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
        content: { background: '#fff', maxWidth: '600px', width: '90vw'},
      }}
    >
      <div className="section-title">
        <h3 className="txt-center">새로운 뱃지가 있어요!</h3>
      </div>
      <hr />
      {achList && achList.map((item, i) => {
        return(<div className="badge-container" style={{marginTop: '2em'}}>
          <div className="badge-item">
            <div className="badge">
              <i className={"fa-solid " + item.ac_icon}></i>
            </div>
            <div className="badge-info txt-center">
              <strong>{item.ac_title}</strong>
              <p>{item.ac_info}</p>
            </div>
          </div>
        </div>)
      })}
    </Modal>
  );
}