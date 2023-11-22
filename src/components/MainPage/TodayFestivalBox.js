import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 80rem;
`;

const Header = styled.div`
  box-sizing: border-box;
  margin-bottom: 0.6rem;
  font-size: 1.8rem;
  font-weight: 900;
`;

const FestivalTable = styled.table`
  width: 100%;
`;

const FestivalTr = styled.tr`
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 0.1rem solid;
  border-top: ${(props) => (props.isfirst ? "0.1rem solid" : "0rem;")};
  background-color: ${(props) => (props.iscolored ? "rgb(208, 235, 201)" : "white")};
`;

const LocalLogoTd = styled.td`
  width: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LocalLabel = styled.div`
  box-sizing: border-box;
  width: 7rem;
  height: 2.8rem;
  line-height: 2.8rem;
  text-align: center;
  border-radius: 2rem;
  font-size: 1.5rem;
  color: white;
  background-color: #2b2424;
`;

const TitleLabelTd = styled.td`
  width: calc(100% - 21rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 800;
  text-decoration: underline;
  font-size: 1.5rem;
`;

const DateLabelTd = styled.td`
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: red;
  font-size: 1.5rem;
`;

const FestivalLink = styled(Link)`
  color: black;
`;

function TableRow({ festivalData, ix }) {
  return (
    <>
      {/*오늘의 축제 테이블의 하나의 열을 구성하는 파트 */}
      <FestivalTr iscolored={ix % 2 === 0 ? 1 : 0} isfirst={ix === 0 ? 1 : 0}>
        {/*지역명*/}
        <LocalLogoTd>
          <LocalLabel>{festivalData.location}</LocalLabel>
        </LocalLogoTd>
        {/*축제명 링크*/}
        <TitleLabelTd>
          <FestivalLink to={`/festival_detail/${festivalData.id}`}>{festivalData.name}</FestivalLink>
        </TitleLabelTd>
        {/*축제 일정*/}
        <DateLabelTd>
          {`${festivalData.date[0].replace("-", ".").trim()}. ~
                     ${festivalData.date[1].replace("-", ".").trim()}`}
        </DateLabelTd>
      </FestivalTr>
    </>
  );
}

function TodayFestivalBox({ todayFestivals }) {
  return (
    <Wrapper>
      <Header>{"오늘의 축제 소식"}</Header>
      {/*해당되는 축제 리스트르 출력하는 테이블 */}
      <FestivalTable>
        <tbody>
          {todayFestivals.map((el, ix) => (
            <TableRow key={ix} festivalData={el} ix={ix} />
          ))}
        </tbody>
      </FestivalTable>
    </Wrapper>
  );
}

export default TodayFestivalBox;
