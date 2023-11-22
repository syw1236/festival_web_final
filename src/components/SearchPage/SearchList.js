import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import festivalsData from "../../data/festivalsData";
import "../../css/SearchPage/SearchList.css";
import NavigationBar from "../CommonComp/navigationBar";

const SearchList = () => {
  // 라우팅 과정에서 전달되는 데이터를 가져오기 위한 useLocation 후크
  const location = useLocation();

  // 전체 축제 데이터를 관리하는 상태변수
  const [festivals, setFestivals] = useState(festivalsData);
  // 현재 검색어를 관리하는 상태변수
  const [userInput, setUserInput] = useState(location.state ? location.state.initSearchWord : "");
  // 지역필터로 선택된 지역명을 관리하는 상태변수
  const [selectedArea, setSelectedArea] = useState("");

  // 페이지 이동시 스크롤을 맨위로 이동시킨다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 검색바에 입력변화를 처리하는 함수
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  // 좋아요 버튼 클릭 처리함수
  const handleLike = (id) => {
    setFestivals((prevFestivals) =>
      prevFestivals.map((festival) => {
        if (festival.id === id) {
          return {
            ...festival,
            likes: festival.liked ? festival.likes - 1 : festival.likes + 1,
            liked: !festival.liked,
          };
        }
        return festival;
      })
    );
  };

  // 지역필터 변경 이벤트 처리함수
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    if (e.target.value !== "") {
      setFestivals(
        festivalsData.filter((festival) => festival.location.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    } else {
      setFestivals(festivalsData);
    }
  };

  // 검색어에 따라 데이터검색
  const searched = festivals.filter((item) => item.name.toLowerCase().includes(userInput));

  return (
    <>
      {/*상단의 네비게이션바*/}
      <NavigationBar backgroundColor={"rgb(206, 220, 255)"} hoverColor={"rgb(145, 176, 255)"} />
      <div className="centerContainer">
      <div className="searchListContainer">
        {/*검색바*/}
        <h1 className="searchListTitle"> Festival List</h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input value={userInput} onChange={getValue} className="search-box" placeholder="궁금한 축제를 입력하세요" />
        </div>
        {/*지역필터 부분*/}
        <div className="select-container">
          <select name="searchArea" id="searchArea" title="지역 선택" value={selectedArea} onChange={handleAreaChange}>
            <option value="">지역</option>
            <option value="서울">서울</option>
            <option value="인천">인천</option>
            <option value="대전">대전</option>
            <option value="대구">대구</option>
            <option value="광주">광주</option>
            <option value="부산">부산</option>
            <option value="울산">울산</option>
            <option value="세종">세종</option>
            <option value="경기">경기도</option>
            <option value="강원">강원도</option>
            <option value="충북">충청북도</option>
            <option value="충남">충청남도</option>
            <option value="경북">경상북도</option>
            <option value="경남">경상남도</option>
            <option value="전북">전라북도</option>
            <option value="전남">전라남도</option>
            <option value="제주">제주도</option>
          </select>
        </div>
        {/*검색 결과가 나오는 부분*/}
        <div className="searchResultsContainer">
          {searched.map((item) => (
            <Card key={item.id} handleLike={handleLike} {...item} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

// 검색결과를 구성하는 카드 컴포넌트
function Card({ id, name, location, detail_location, likes, liked, poster, handleLike }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cardContainer ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*카드의 포스터 부분*/}
      <Link to={`/festival_detail/${id}`}>
        <div className="poster-container">
          <img src={poster} alt={name} />
          {isHovered && (
            <div className="overlay">
              <p>{detail_location}</p>
            </div>
          )}
        </div>
      </Link>
      {/*카드 정보 부분*/}
      <h2>{name}</h2>
      <p>{location}</p>
      <button onClick={() => handleLike(id)}>
        <FaHeart style={{ color: liked ? "red" : "grey" }} />
        {likes}
      </button>
    </div>
  );
}

export default SearchList;
