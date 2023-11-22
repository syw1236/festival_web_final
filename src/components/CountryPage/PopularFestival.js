import FestivalSimple from "./FestivalSimple";
import "../../css/CountryPage/PopularFestival.css";
const PopularFestival = ({ festivals, country }) => {
  //좋아요가 많은 상위 6개의 축제 데이터를 선별
  const sortedArray = festivals.sort((a, b) => b.likes - a.likes);
  const top6Array = sortedArray.slice(0, 6);

  return (
    <div className="currentpopularity">
      {/* 클릭한 지역의 인기축제 파트 헤더 */}
      <div className="popularityContain">
        <span className="popularityregion">{country} </span>
        <span className="regionDes">현재 인기 축제</span>
      </div>
      {/* 클릭한 지역의 인기 축제 6개를 한 줄에 3개씩 나타냄 */}
      <div className="festivalSimpleContainer">
        {top6Array.map((item, ix) => (
          <div key={ix} className="festivalsimple">
            <FestivalSimple festival={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFestival;
