// Tab_Winter.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Tab/Tab_Winter.css';

const Tab_Winter = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  //메뉴 탭 구현 (탭 이름과 각 탭에 들어갈 내용)
  const menuArr = [
    { name: '봄 축제', content: '#철쭉 #꽃' },
    { name: '여름 축제', content: '#머드 #물놀이' },
    { name: '가을 축제', content: '#가을 #단풍 #핑크뮬리' },
    { name: '2023을 장식할 겨울 축제', content: '#눈 #얼음분수' },
  ];

  //선택한 인덱스로 clickTab함수를 이용하여 탭 이동
  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  //각 탭마다 정해진 키워드를 이용
  const filteredFestivals = festivalsData.filter((festival) => {
    const tab0Keywords = ['철쭉'];
    const tab1Keywords = ['머드'];
    const tab2Keywords = ['단풍', '가을', '핑크뮬리'];
    const tab3Keywords = ['눈꽃','얼음분수'];

    const keywords =
      currentTab === 0
        ? tab0Keywords
        : currentTab === 1
        ? tab1Keywords
        : currentTab === 2
        ? tab2Keywords
        : currentTab === 3
        ? tab3Keywords
        : [];

    return keywords.some((keyword) =>
      festival.name.toLowerCase().includes(keyword)
    );
  });

  //데이터 출력하기, 포스터 클릭 시 세부정부 페이지로 이동
  return (
    <div className="centerContainerTabWinter">
      <div>
        <ul className="winter-tab-menu">
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
        <div className="winter-desc">
        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{menuArr[currentTab].content}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredFestivals.map((item) => (
              <div className="winter-festival-card" key={item.id}>
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

export default Tab_Winter;
