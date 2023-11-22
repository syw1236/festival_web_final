import { Link } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 6rem;
  background-color: ${(props) => props.backgroundcolor};
  display:flex;
  flex-direction column;
  justify-content: center;
  align-items : center;
`;

const LinkButton = styled(Link)`
  box-sizing: border-box;
  height: 2.5rem;
  margin: 0rem 2.5rem;
  font-size: 2rem;
  display:flex;
  flex-direction column;
  justify-content: center;
  align-items : center;
  text-decoration: none;
  color:black;
  font-weight: 800;
  &:hover {
    border-bottom: 0.5rem ${(props) => props.hovercolor} solid;
  }
`;

// 모든 페이지의 상단에 띄울 네비게이션 바
const NavigationBar = ({ backgroundColor, hoverColor }) => {
  return (
    <Wrapper backgroundcolor={backgroundColor}>
      <LinkButton to={"/"} hovercolor={hoverColor}>
        홈
      </LinkButton>
      <LinkButton to={"/CountryDetail"} hovercolor={hoverColor}>
        축제정보
      </LinkButton>
      <LinkButton to={"/searchList"} hovercolor={hoverColor}>
        검색
      </LinkButton>
      <LinkButton to={"/tabPrint"} hovercolor={hoverColor}>
        테마
      </LinkButton>
    </Wrapper>
  );
};

export default NavigationBar;
