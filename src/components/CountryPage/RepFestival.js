import "../../css/CountryPage/RepFestival.css";
import { Link } from "react-router-dom";
function RepFestival({ data }) {
  //오늘 날짜를 기준으로 축제의 마지막날까지 남은 기간을 계산함
  const today = new Date();
  var dateArray = data.date[1].split("-");
  var enddayArray = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  const timeDiff = enddayArray.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <div className="RepFestivalContainer">
      <div className="dayRemain">
        {/* 축제 마지막 날까지 남은 날짜를 표시 */}
        <span>D-{daysLeft}</span>
      </div>
      <div className="name">
        {/* 축제의 이름을 표시 */}
        <span>{data.name}</span>
      </div>
      <div className="description">
        {/* 축제의 간단한 설명을 표시 */}
        <span>{data.description}</span>
      </div>
      <div className="moveDetail">
        {/* 축제 상세 페이지로 이동 */}
        <Link to={`/festival_detail/${data.id}`}>
          <button className="lookDetail">자세히 보기</button>
        </Link>
      </div>
    </div>
  );
}
export default RepFestival;
