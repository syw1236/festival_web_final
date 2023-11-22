// Tab_Winter.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Tab/Tab_Winter.css';

const Tab_Winter = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '봄 축제', content: '#철쭉 #꽃' },
    { name: '여름 축제', content: '#물놀이 #더위사냥' },
    { name: '가을 축제', content: '#단풍 #알록달록' },
    { name: '2023을 장식할 겨울 축제', content: '#눈 #2023' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const filteredFestivals = festivalsData.filter((festival) => {
    const tab0Keywords = ['철쭉', '연꽃'];
    const tab1Keywords = ['머드'];
    //const tab2Keywords = ['단풍', '가을', '핑크뮬리', '억새', '갈대', '국화'];
    const tab2Keywords = ['단풍', '가을', '핑크뮬리'];
    const tab3Keywords = ['눈꽃'];

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

  return (
    <div className="aliceblue">
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
