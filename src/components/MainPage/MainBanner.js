import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "../../css/MainPage/MainBanner.css";

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 80rem;
  height: 38rem;
`;

const SlideContentWrapper = styled.div`
  box-sizing: border-box;
  height: 38rem;
  display: grid;
  grid-template-columns: 11fr 14fr;
`;

const BannerTitleWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 35rem;
  padding: 1rem 3rem 0rem 3rem;
  display: flex;
  flex-direction: column;
`;

const LocalLabel = styled.div`
  box-sizing: border-box;
  width: 9rem;
  height: 3.5rem;
  line-height: 3.8rem;
  text-align: center;
  border-radius: 2rem;
  font-size: 1.8rem;
  color: white;
  background-color: #2b2424;
`;

const SubTitle = styled.div`
  box-sizing: border-box;
  max-height: 17rem;
  font-size: 1.7rem;
  font-weight: 600;
  word-break: keep-all;
  overflow-wrap: break-word;
  overflow: hidden;
  margin-top: 2.5rem;
`;

const Title = styled.div`
  box-sizing: border-box;
  max-height: 7rem;
  font-size: 2.1rem;
  font-weight: 700;
  word-break: keep-all;
  overflow-wrap: break-word;
  overflow: hidden;
  padding-top: 0.8rem;
`;

const ShowDetailButt = styled(Link)`
  box-sizing: border-box;
  width: auto;
  color: grey;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
  margin-top: 2rem;
`;

const ImgWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 35rem;
`;

const BannerImg = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.4rem;
  display: block;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
`;

function MainBaanerContent({ festivalData }) {
  return (
    <SlideContentWrapper>
      {/*슬라이드 아이템 내부 글박스 */}
      <BannerTitleWrapper>
        <LocalLabel>{festivalData.location}</LocalLabel>
        <SubTitle>{festivalData.description}</SubTitle>
        <Title>{festivalData.name}</Title>
        <ShowDetailButt to={`/festival_detail/${festivalData.id}`}>{"자세히 보기"}</ShowDetailButt>
      </BannerTitleWrapper>
      {/*슬라이드 아이템 내부 이미지 부분 */}
      <ImgWrapper>
        <BannerImg src={festivalData.image1} />
      </ImgWrapper>
    </SlideContentWrapper>
  );
}

function MainBanner({ festivalDatas }) {
  // 이미지가 없는 데이터는 메인배너에 보이지 않게 걸러낸다.
  const newData = festivalDatas.filter((el) => {
    if (el.image1.trim() === "" || el.image1.trim() === null) return false;
    else return true;
  });
  return (
    <Wrapper>
      {/*배너의 슬라이드 파트 */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="first-slide"
      >
        {newData.map((el, ix) => (
          <SwiperSlide key={ix}>
            <MainBaanerContent festivalData={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

export default MainBanner;
