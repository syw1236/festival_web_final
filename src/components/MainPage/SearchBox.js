import React, { useState, useEffect, useRef } from "react";
import festivalsData from "../../data/festivalsData";
import { FaSearch } from "react-icons/fa";
import "../../css/MainPage/SearchBox.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function SearchBox() {
  // 입력된 검색어 상태변수
  const [searchTerm, setSearchTerm] = useState("");
  // 검색에에 따른 연관검색어 데이터 상태변수
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  // 연관검색어 박스를 보이게 할지 여부를 결정하는 상태변수
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // 페이지 이동을 위한 네비게이션 후크
  const navigate = useNavigate();

  // 검색창에 입력값이 변하는 것을 처리하는 이벤트 함수
  const handleInputChange = (e) => {
    // 검색어 정리
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    // 검색어가 존재할 경우, 연관검색어를 구해서 출력
    if (newSearchTerm.trim() !== "") {
      createAutocompleteResults(newSearchTerm);
      setShowAutocomplete(true);
      // 검색어가 존재하지 않을 경우, 연관검색어 출력x
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
    }
  };

  // 검색어를 기준으로 최대 10개의 연관검색어를 구해서 autocompleteResults 상태변수를 업데이트하는 함수
  const createAutocompleteResults = (term) => {
    const results = festivalsData
      .filter((festival) => festival.name.toLowerCase().includes(term))
      .map((festival) => ({ id: festival.id, name: festival.name }))
      .slice(0, 10);

    setAutocompleteResults(results);
  };

  // 연관 검색어를 클릭할 경우, 해당 축제의 상세페이지로 이동
  const handleAutocompleteClick = (id, name) => {
    setSearchTerm(name);
    setShowAutocomplete(false);
    navigate(`/festival_detail/${id}`);
  };

  // 검색버튼 클릭시 처리함수
  const handleSearchClick = () => {
    navigate(`/searchList`, { state: { initSearchWord: searchTerm } });
  };

  return (
    <div className="search-container">
      {/*검색창 구성*/}
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowAutocomplete(true)}
        placeholder="어떤 축제로 떠나볼까요?"
        className="search-input"
      />
      <FaSearch onClick={handleSearchClick} className="search-icon" />
      {/*연관 검색어 박스 구성*/}
      {showAutocomplete && autocompleteResults.length > 0 && (
        <ul className="autocomplete-list">
          {autocompleteResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleAutocompleteClick(result.id, result.name)}
              className={"autocomplete-item"}
            >
              <FaSearch className="search-icon2" />
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
