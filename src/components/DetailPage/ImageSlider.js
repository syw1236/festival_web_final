import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../css/DetailPage/FestivalDetail.css";

const ImageSlider = ({ images, initialSlide }) => {
  // ImageGallery를 활용하기 위해 객체배열 생성
  const imageItems = images.map((image) => ({
    original: image,
    thumbnail: image,
    originalHeight: "600px",
    originalweight: "200px",
  }));

  return (
    <ImageGallery
      additionalClass="slider"
      items={imageItems}
      startIndex={initialSlide}
    />
  );
};

export default ImageSlider;
