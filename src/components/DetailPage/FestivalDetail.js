import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import festivalsData from "../../data/festivalsData";
import { FaHeart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import "../../css/DetailPage/FestivalDetail.css";
import { MdOutlineSchedule } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { BiWon } from "react-icons/bi";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import NavigationBar from "../CommonComp/navigationBar";

// 카카오 맵스를 활용하기 위해 kakao객체를 받아옴
const { kakao } = window;
const FestivalDetail = () => {
  // 라우터 경로에서 id(파라미터 정보)를 가져온다.
  const { id } = useParams();

  // id에 해당하는 축제데이터 구하기
  const festival = festivalsData.find((item) => item.id === parseInt(id));

  // 축제의 상태를 나타내느 상태변수 (종료/진행중/예정)
  const [festivalStatus, setFestivalStatus] = useState("");

  // 좋아요 관련 상태변수
  const [liked, setLiked] = useState(false); // 좋아요버튼을 눌러는지 여부
  const [likes, setLikes] = useState(festival.likes); // 좋아요 개수

  const [currentImage, setCurrentImage] = useState(0); // 이미지 모달창에서의 현재 이미지 인덱스
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // 이미지 모달창 활성화 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 지도 모달창 활성화 여부
  const [coords, setCoords] = useState(null); // 좌표 상태 관리를 위한 state

  // 페이지 이동시 스크롤을 맨위로 이동시킨다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 축제 데이터가 없다면 종료
    if (!festival) {
      return;
    }

    // 축제 상태를 체크하고 적용
    const currentDate = new Date();
    const startDate = new Date(festival.date[0]);
    const endDate = new Date(festival.date[1]);
    let status = "";
    if (currentDate < startDate) {
      // 현재 날짜가 시작 날짜보다 이전이면
      status = "축제 예정";
    } else if (currentDate > endDate) {
      // 현재 날짜가 종료 날짜보다 이후이면
      status = "축제 종료";
    } else {
      // 그 외의 경우 (즉, 현재 날짜가 시작 날짜와 종료 날짜 사이에 있으면)
      status = "축제 진행 중";
    }
    setFestivalStatus(status);

    // 카카오 맵스를 활용한 지도 세팅
    console.log(kakao);
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // 카카오맵스의 Geocoder 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // Geocoder를 활용해 축제 주소에 해당하는 지도를 생성하고 마커추가
    geocoder.addressSearch(festival.detail_location, function (result, status) {
      // 지도 검색이 성공한 경우
      if (status === kakao.maps.services.Status.OK) {
        // 좌표를 등록하고, 지도와 마커 생성
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setCoords(coords); // 좌표 상태 업데이트
        options.center = coords;
        const map = new kakao.maps.Map(container, options);

        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 마커 클릭시 지도 모달창 open
        kakao.maps.event.addListener(marker, "click", function () {
          setIsModalOpen(true);
        });
      } else {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });

    // 모달이 열릴 때 지도를 숨기고, 모달이 닫힐 때 지도를 다시 보여주는 코드
    if (isModalOpen) {
      document.getElementById("map").style.display = "none";
    } else {
      document.getElementById("map").style.display = "block";
    }
  }, [festival, isModalOpen]);

  // 데이터가 존재하지 않을 경우 처리함수
  if (!festival) {
    return <div>Festival not found</div>;
  }

  // 지도 모달창 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 좋아요 처리 함수
  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  // 이미지 모달창 열기 함수
  const openImageModal = (index) => {
    setCurrentImage(index);
    setIsImageModalOpen(true);
  };

  // 이미지 모달창 닫기 함수
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <>
      <NavigationBar
        backgroundColor={"rgb(255, 247, 220)"}
        hoverColor={"rgb(220, 204, 143)"}
      />
      <div className="yellow-section">
        {/*상단 배너 파트 */}
        <div
          className="bannerArea"
          style={{ display: "flex", marginBottom: "30px" }}
        >
          <div className="bannerContent">
            {/*상단 배너의 글박스*/}
            <div className="bannerTitleBox">
              {/*메인페이지 돌아가기 링크*/}
              <Link to="/" style={{ textDecoration: "none" }}>
                <span className="bold-text-main">
                  <IoHome style={{ fontSize: "20px" }} />
                  <span style={{ marginLeft: "8px" }}>축제 메인으로</span>
                </span>
              </Link>
              {/*배너의 글박스 내용부분*/}
              <div className="sub_title">{festival.description}</div>
              <div className="bold-title">{festival.name}</div>
              <div
                className="festival-status"
                style={{
                  backgroundColor:
                    festivalStatus === "축제 진행 중" ? "orangered" : "grey",
                }}
              >
                {festivalStatus}
              </div>
              <div className="banner_date">{festival.date.join(" ~ ")}</div>
              <div onClick={handleLike} className="like-button">
                <FaHeart
                  style={{ color: liked ? "red" : "grey", marginRight: "13px" }}
                />
                {likes}
              </div>
            </div>
            {/*배너에 포함된 포스터*/}
            <img
              className="poster-image"
              src={festival.poster}
              alt={festival.name}
            />
          </div>
        </div>
        {/*축제 관련 세부정보 출력박스*/}
        <div className="festivalContentArea">
          <div className="festivalContentBox">
            {/*축제 관련 이미지 출력 파트*/}
            <div className="image-container">
              <img
                src={festival.image1}
                alt="축제 이미지1"
                className="festival-image"
                onClick={() => openImageModal(0)}
              />
              <img
                src={festival.image2}
                alt="축제 이미지2"
                className="festival-image"
                onClick={() => openImageModal(1)}
              />
              <img
                src={festival.image3}
                alt="축제 이미지3"
                className="festival-image"
                onClick={() => openImageModal(2)}
              />
            </div>
            {/*축제 관련 정보 파트*/}
            <div className="content-container">
              <div className="imgDescription">
                이미지를 클릭하면 크게 볼 수 있습니다.
              </div>
              <p className="festival-description">
                {festival.detail_description}
              </p>
              <hr className="line" />
              <div className="information">
                <p>
                  <FaRegCalendarCheck className="icon-style" />{" "}
                  {festival.date.join(" ~ ")}
                </p>
                <p>
                  <IoLocationSharp className="icon-style" />{" "}
                  {festival.detail_location}
                </p>
                <p>
                  <IoCall className="icon-style" /> {festival.tel}
                </p>
                <p>
                  <MdOutlineSchedule className="icon-style" /> {festival.time}
                </p>
                <p>
                  <BiWon className="icon-style" /> {festival.pay}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*축제 위치 지도 파트*/}
        <div className="mapArea">
          <div className="mapBox">
            <hr className="line" />
            <h2 className="mapTitle">길찾기</h2>
            <div className="tip">마커를 누르면 상세보기가 가능합니다.</div>
            <div className="mapContainer">
              <div
                id="map"
                style={{ width: "100%", height: "30rem", zIndex: 0 }}
              ></div>
            </div>
          </div>
        </div>
        {/*이미지 모달창*/}
        <Modal
          isOpen={isImageModalOpen}
          onRequestClose={closeImageModal}
          contentLabel="Image Modal"
          style={imageModalStyles}
          ariaHideApp={false}
        >
          <div className="imageModalWrapper">
            <ImageSlider
              images={[festival.image1, festival.image2, festival.image3]}
              initialSlide={currentImage}
              onClickXButton={closeImageModal}
            />
            <IoMdCloseCircle
              color={"rgb(28, 67, 167)"}
              onClick={closeImageModal}
              className="close-button1"
            />
          </div>
        </Modal>
        {/*지도 모달창*/}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Map Modal"
          style={mapModalStyles}
          ariaHideApp={false}
        >
          {coords && (
            <>
              <iframe
                title="image"
                className="modalMap"
                src={`https://map.kakao.com/link/map/${
                  festival.name
                },${coords.getLat()},${coords.getLng()}`}
              ></iframe>
              <IoMdCloseCircle onClick={closeModal} className="close-button2" />
            </>
          )}
        </Modal>
      </div>
    </>
  );
};
const imageModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "60rem",
    height: "670px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgb(206, 220, 255)",
  },
};

const mapModalStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "90vw",
    height: "85vh",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
    backgroundColor: "rgb(206, 220, 255)",
  },
};
export default FestivalDetail;
