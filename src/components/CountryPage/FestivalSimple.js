import "../../css/CountryPage/FestivalSimple.css";
import { Link } from "react-router-dom";

// CountryPage에서 인기 축제를 나타내는 박스를 정의하는 컴포넌트
function FestivalSimple({ festival }) {
  return (
    <div className="festivalContain">
      <Link to={`/festival_detail/${festival.id}`} style={{ textDecoration: "none", color: "black" }}>
        <img className="festivalImage" src={festival.poster} alt="festival.poster" />
        <div className="festivalName">{festival.name}</div>
        <div className="festivalLocation">{festival.detail_location}</div>
      </Link>
    </div>
  );
}
export default FestivalSimple;
