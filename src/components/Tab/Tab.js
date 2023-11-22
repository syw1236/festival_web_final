// Tab.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Tab/Tab.css';
import festivalsData from '../../data/festivalsData';


const Tab = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  //메뉴 탭 구현 (탭 이름과 각 탭에 들어갈 내용)
  const menuArr = [
    { name: '야경 축제', content: '#달빛 #별빛' },
    { name: '새해 2024', content: '#해돋이 #해맞이' },
    { name: '먹거리 축제', content: '#쌀 #김장' },
  ];

  //선택한 인덱스로 clickTab함수를 이용하여 탭 이동
  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  //각 탭마다 정해진 키워드를 이용
  const filteredFestivals = festivalsData.filter((festival) => {
    const tab0Keywords = ['달빛','별빛','강빛'];
    const tab1Keywords = ['해맞이'];
    const tab2Keywords = ['곶감', '쌀', '김장'];


    if (currentTab === 0) {
      return tab0Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    } else if (currentTab === 1) {
      return tab1Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    } else if (currentTab === 2) {
      return tab2Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    }
    return false;
  });

  //데이터 출력하기, 포스터 클릭 시 세부정부 페이지로 이동
  return (
    <div className="centerContainerTab">
      <div>
        <ul className="tab-menu">
          {menuArr.map((el, index) => (
            <li
            key={index}
            className={index === currentTab ? 'winter-submenu active' : 'winter-submenu'}
            onClick={() => selectMenuHandler(index)}
          >
              {el.name}
            </li>
          ))}
        </ul>
        <div className="desc">
        <p style={{ fontWeight: 'bold', fontSize: '25px'}}>{menuArr[currentTab].content}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredFestivals.map((item) => (
              <div className="festival-card" key={item.id}>
                <p>{item.name}</p>
                <Link to={`/festival_detail/${item.id}`}>
                  <div className="posterContainer">
                    <img src={item.poster} alt={item.name} />
                    <div className="overlay">
                      <p>{item.detail_location}</p>
                    </div>
                  </div>
                </Link>
                <p>{item.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
