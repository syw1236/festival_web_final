import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListItem = styled.div`
  box-sizing: border-box;
  width: 25rem;
`;

const Poster = styled.img`
  box-sizing: border-box;
  display: block;
  width: 25rem;
  height: 26rem;
  cursor: pointer;
`;

const LikePrint = styled.div`
  box-sizing: border-box;
  width: 25rem;
  height: 4rem;
  padding: 0.2rem;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem;
`;

const HeartShape = styled(FaHeart)`
  box-sizing: border-box;
  display: inline-block;
  margin: 0rem 1rem;
  font-size: 2.5rem;
`;

const LikeCount = styled.div`
  box-sizing: border-box;
  font-weight: 700;
`;

function FamousFestivalListItem({ data }) {
  // 현재 좋아요 개수
  const [likes, setLikes] = useState(data.likes);
  // 좋아요 버튼이 눌렸는지 여부
  const [liked, setLiked] = useState(false);

  // 좋아요 버튼 클릭 함수
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  // 포스터 클릭시 축제상세 페이지로 이동
  const navigate = useNavigate();
  const clikPoster = () => {
    navigate(`/festival_detail/${data.id}`);
  };

  return (
    <ListItem>
      {/*포스터 부분*/}
      <Poster src={data.poster} onClick={clikPoster} />
      {/*좋아요 부분*/}
      <LikePrint onClick={handleLike}>
        <HeartShape color={liked ? "red" : "grey"} />
        <LikeCount>{likes}</LikeCount>
      </LikePrint>
    </ListItem>
  );
}

export default FamousFestivalListItem;
