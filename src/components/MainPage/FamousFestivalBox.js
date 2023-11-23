import styled from "styled-components";
import FamousFestivalListItem from "./FamousFestivalListItem";

const Wrapper = styled.div`
  width: 80rem;
`;

const Header = styled.div`
  box-sizing: border-box;
  margin-bottom: 0.6rem;
  font-size: 1.8rem;
  font-weight: 900;
`;

const ListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
`;

const ItemWrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 1.5rem;
`;

function FamousFestivalBox({ likedFestivals }) {
  return (
    <Wrapper>
      <Header>{"현재 인기있는 국내축제"}</Header>
      {/*좋아요 수가 많은 6개의 축제를 카드형식으로 출력*/}
      <ListWrapper>
        {likedFestivals.map((el, ix) => {
          return (
            <ItemWrapper key={ix}>
              <FamousFestivalListItem data={el} />
            </ItemWrapper>
          );
        })}
      </ListWrapper>
    </Wrapper>
  );
}

export default FamousFestivalBox;
