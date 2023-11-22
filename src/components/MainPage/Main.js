import styled from "styled-components";
import { useState, useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import TodayFestivalBox from "./TodayFestivalBox";
import FamousFestivalBox from "./FamousFestivalBox";
import MainBanner from "./MainBanner";
import festivalData from "../../data/festivalsData";
import NavigationBar from "../CommonComp/navigationBar";

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    rgb(218, 230, 240) 25rem,
    white 0%
  );
`;

const MainBannerArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-bottom: 2.5rem;
`;

const TodayFestivalArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.8rem 2rem 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FamousFestivalArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.8rem;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Main() {
  // 축제데이터
  const [fullData, setFestivalData] = useState(festivalData);

  // 페이지 이동시 스크롤을 맨위로 이동시킨다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 현재 날짜기준 진행중인 축제데이터 배열을 구한다.
  const todayFestivals = useMemo(() => {
    return fullData.filter((el, ix) => {
      // 시작날짜 세팅
      let startDate = new Date(el.date[0]);
      startDate.setHours(0);
      // 끝날짜 세팅
      let endDate = new Date(el.date[1]);
      endDate.setDate(endDate.getDate() + 1); // (축제기간 :11/15 ~ 11/17)이면 (11/18 00:00)으로 세팅함으로써 11/17일 전체가 기간에 포함되도록 한다.
      endDate.setHours(0);
      // 현재날짜 세팅
      let today = new Date();

      return today >= startDate && today <= endDate;
    });
  }, [fullData]);

  // 메인 배너로 보여줄 랜덤 축제데이터 선별
  const randomFestivals = useMemo(() => {
    const randomArr = [];
    var tmp = 0;
    for (var i = 0; i < 6; i++) {
      while (true) {
        tmp = Math.floor(Math.random() * fullData.length);
        if (randomArr.indexOf(tmp) === -1) {
          randomArr[i] = tmp;
          break;
        }
      }
    }
    return randomArr.map((el, ix) => fullData[el]);
  }, [fullData]);

  // 좋아요 수가 가장 많은 6개의 축제데이터를 구하는 함수
  const likedFestivals = useMemo(() => {
    const newData = [...fullData];
    return newData.sort((a, b) => b.likes - a.likes).slice(0, 6);
  }, [fullData]);

  return (
    <>
      {/*네비게이션바*/}
      <NavigationBar
        backgroundColor={"rgb(218, 230, 240)"}
        hoverColor={"rgb(158, 170, 185)"}
      />
      <Wrapper>
        {/*메인 배너 부분*/}
        <MainBannerArea>
          <MainBanner festivalDatas={randomFestivals} />
        </MainBannerArea>
        {/*검색바 부분*/}
        <SearchArea>
          <SearchBox />
        </SearchArea>
        {/*오늘의 축제 테이블 부분*/}
        <TodayFestivalArea>
          <TodayFestivalBox todayFestivals={todayFestivals} />
        </TodayFestivalArea>
        {/*인기 축제 부분*/}
        <FamousFestivalArea>
          <FamousFestivalBox likedFestivals={likedFestivals} />
        </FamousFestivalArea>
      </Wrapper>
    </>
  );
}

export default Main;
