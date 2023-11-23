import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/CountryPage/CalendarSwiper.css";
// import "./CalendarSwiper.css";

import { Pagination, Navigation } from "swiper/modules";

const CalendarSwiper = ({ festivals }) => {
  // 축제데이터가 없을 경우 이미지처리를 위한 배열
  if (festivals.length === 0) {
    festivals = [
      {
        poster: "/image/icon/noimage.png",
      },
      {
        poster: "/image/icon/noimage.png",
      },
      {
        poster: "/image/icon/noimage.png",
      },
    ];
  }
  return (
    <div className="swiperContainer">
      {/*슬라이더 정의*/}
      <Swiper
        slidesPerView={3}
        spaceBetween={90}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {/*슬라이드 요소(포스터)를 정의*/}
        <div className="posterContainer">
          {festivals.map((festival, i) => {
            // 유효한 축제데이터라면 링크를 적용하고, 아니라면 링크를 빼고 포스터(슬라이어 요소)를 정의
            if (festival.id === -1) {
              return (
                <div key={i}>
                  <SwiperSlide key={i} className="imgContainer">
                    <img
                      className="image"
                      src={festival.poster}
                      alt={`festival-${i}`}
                    />
                  </SwiperSlide>
                </div>
              );
            } else {
              return (
                <div key={i}>
                  <SwiperSlide key={i} className="imgContainer">
                    <Link to={`/festival_detail/${festival.id}`}>
                      <img
                        src={festival.poster}
                        alt={`festival-${i}`}
                        className="image"
                      />
                    </Link>
                  </SwiperSlide>
                </div>
              );
            }
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default CalendarSwiper;
