import React, { useEffect, useState } from "react";
import RepFestivalList from "./RepFestivalList";
import PopularFestival from "./PopularFestival";
import Calendar from "./Calendar";
import NavigationBar from "../CommonComp/navigationBar";
import "../../css/CountryPage/CountryDetail.css";
import data from "../../data/festivalsData";

// 지역이름과 지역별 로고 이미지 데이터
const Countrys = [
  {
    region: "서울",
    image: "/image/logo/seoulLogo.png",
  },
  {
    region: "부산",
    image: "/image/logo/busanLogo.png",
  },
  {
    region: "대구",
    image: "/image/logo/daeguLogo.png",
  },
  {
    region: "인천",
    image: "/image/logo/incheonLogo.png",
  },
  {
    region: "광주",
    image: "/image/logo/gwangjuLogo.png",
  },
  {
    region: "대전",
    image: "/image/logo/daejeonLogo.png",
  },
  {
    region: "울산",
    image: "/image/logo/ulsanLogo.png",
  },
  {
    region: "세종",
    image: "/image/logo/sejongLogo.png",
  },
  {
    region: "경기",
    image: "/image/logo/gyeonggiLogo.png",
  },
  {
    region: "강원",
    image: "/image/logo/gangwonLogo.png",
  },
  {
    region: "충북",
    image: "/image/logo/chungbukLogo.png",
  },
  {
    region: "충남",
    image: "/image/logo/chungnamLogo.png",
  },
  {
    region: "전북",
    image: "/image/logo/jeonbukLogo.png",
  },
  {
    region: "전남",
    image: "/image/logo/jeonnamLogo.jpg",
  },
  {
    region: "경북",
    image: "/image/logo/gyeongbukLogo.png",
  },
  {
    region: "경남",
    image: "/image/logo/gyeongnamLogo.png",
  },
  {
    region: "제주",
    image: "/image/logo/jejuLogo.png",
  },
];
function CountryDetail() {
  // 선택한 지역에 대한 인덱스 상태
  const [activeIndex, setActiveIndex] = useState(0);
  // 축제 데이터 상태
  const [festivalArray, setFestivalArray] = useState(data);

  // 페이지 이동시 스크롤을 맨위로 이동시킨다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 지역 클릭시 activeIndex 변경
  const handleCountryClick = (index) => {
    setActiveIndex(index);
  };

  // activeIndex가 변경될 때마다 해당하는 지역데이터를 festivalArray상태에 넣는다.
  useEffect(() => {
    const filterlocationArray = data.filter(
      (item) => item.location === Countrys[activeIndex].region
    );
    setFestivalArray(filterlocationArray);
  }, [activeIndex]);

  return (
    <>
      <NavigationBar
        backgroundColor={"rgb(206, 220, 255)"}
        hoverColor={"rgb(145, 176, 255)"}
      />
      <div className="centerContainer">
        <div className="countryContainer">
          {/*상단 지역 리스트*/}
          <ul className="countryul">
            {Countrys.map((country, i) => (
              <li
                className={`countryli ${activeIndex === i ? "active" : ""}`}
                key={i}
                onClick={() => handleCountryClick(i)}
              >
                {country.region}
              </li>
            ))}
          </ul>
        </div>
        {/* 클릭한 지역 표시*/}
        <div className="clickCountryContainer">
          <div className="localFestivalArea">
            <div className="localFestivalContainer">
              {/* 선택된 지역이름을 보여주는 haeder표시*/}
              <div className="clickCountry">
                <img
                  src={activeIndex == null ? "" : Countrys[activeIndex].image}
                  width={30}
                  height={30}
                  alt={activeIndex == null ? "" : Countrys[activeIndex].region}
                  className="countryImage"
                />
                <div className="clickCountryName">
                  {activeIndex !== null && Countrys[activeIndex].region}
                </div>
                <img
                  src="/image/icon/arrow.png"
                  width={30}
                  height={30}
                  alt="arrow.png"
                />
              </div>
              {/* 클릭한 지역의 축제 D-day 표시*/}
              <RepFestivalList
                data={festivalArray}
                country={Countrys[activeIndex].region}
              />
            </div>
          </div>
        </div>
        {/* 클릭한 지역의 인기 축제 나열*/}
        <div className="currentContainer">
          <PopularFestival
            festivals={festivalArray}
            country={Countrys[activeIndex].region}
          />
        </div>
        {/* 달력 및 해당 날짜에 맞는 포스터 나타내는 부분 */}
        <div>
          <Calendar
            festivals={festivalArray}
            country={Countrys[activeIndex].region}
          />
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
