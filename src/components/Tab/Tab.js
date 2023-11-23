import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Tab/Tab.css";
import festivalsData from "../../data/festivalsData";

const Tab = ({ festivalsData }) => {
  const [currentTab, clickTab] = useState(0);

  //메뉴 탭 구현 (탭 이름과 각 탭에 들어갈 내용)
  const menuArr = [
    {
      name: "# 야경 축제",
      content: "#달빛 #별빛 #강빛",
      image: [
        "/image/seoul/SeoulStarDetail2.jpg",
        "/image/daegu/DaeguDarkDetail1.png",
      ],
    },
    {
      name: "# 새해 2024",
      content: "#해돋이 #해맞이",
      image: ["/image/gangwon/24_image_2.jpg", "/image/ulsan/ulsan_sun1.jpg"],
    },
    {
      name: "# 먹거리 축제",
      content: "#쌀 #김장 #곶감",
      image: [
        "/image/chungnam/15_image_1.jpg",
        "/image/chungnam/15_image_1.jpg",
      ],
    },
    {
      name: "# 봄 축제",
      content: "#철쭉 #꽃",
      image: ["/image/gyeonggi/5_image_1.jpg", "/image/gyeonggi/5_image_3.jpg"],
    },
    {
      name: "# 여름 축제",
      content: "#머드 #물놀이",
      image: [
        "/image/chungnam/14_image_1.jpg",
        "/image/chungnam/14_image_3.jpg",
      ],
    },
    {
      name: "# 가을 축제",
      content: "#가을 #단풍 #핑크뮬리",
      image: ["/image/jeju/pinkMuhly/2.jpg", "/image/sejong/sejong_park3.png"],
    },
    {
      name: "# 겨울 축제",
      content: "#눈꽃 #얼음분수",
      image: [
        "/image/gangwon/22_image_1.jpg",
        "/image/chungnam/13_image_3.jpg",
      ],
    },
  ];

  //선택한 인덱스로 clickTab함수를 이용하여 탭 이동
  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  //각 탭마다 정해진 키워드를 이용
  const filteredFestivals = festivalsData.filter((festival) => {
    const tab0Keywords = ["달빛", "별빛", "강빛"];
    const tab1Keywords = ["해맞이", "해돋이"];
    const tab2Keywords = ["곶감", "쌀", "김장"];
    const tab3Keywords = ["철쭉"];
    const tab4Keywords = ["머드"];
    const tab5Keywords = ["단풍", "가을", "핑크뮬리"];
    const tab6Keywords = ["눈꽃", "얼음분수"];

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
    } else if (currentTab === 3) {
      return tab3Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    } else if (currentTab === 4) {
      return tab4Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    } else if (currentTab === 5) {
      return tab5Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    } else if (currentTab === 6) {
      return tab6Keywords.some((keyword) =>
        festival.name.toLowerCase().includes(keyword)
      );
    }
    return false;
  });

  //데이터 출력하기, 포스터 클릭 시 세부정부 페이지로 이동
  return (
    <div
      className="centerContainerTab"
      style={{
        backgroundImage: `url(${
          menuArr[currentTab].image[Math.floor(Math.random() * 2)]
        })`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        height: "47rem",
      }}
    >
      <div>
        <ul className="tab-menu">
          {menuArr.map((el, index) => (
            <li
              key={index}
              className={
                index === currentTab
                  ? "winter-submenu active"
                  : "winter-submenu"
              }
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <div className="desc">
          <p style={{ fontWeight: "bold", fontSize: "25px" }}>
            {menuArr[currentTab].content}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
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
