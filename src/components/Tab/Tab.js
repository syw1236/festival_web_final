// Tab.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Tab/Tab.css';
import festivalsData from '../../data/festivalsData';


const Tab = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '야경 축제', content: '#야경 #빛' },
    { name: '새해 2024', content: '#해돋이 #새해' },
    { name: '먹거리 축제', content: '#음식 #먹거리' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const filteredFestivals = festivalsData.filter((festival) => {
    const tab0Keywords = ['이월드', '밤마실'];
    const tab1Keywords = ['해맞이'];
    const tab2Keywords = ['곶감', '쌀', '김장', '포도'];


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

  return (
    <div className="purple-background">
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
        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{menuArr[currentTab].content}</p>
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
