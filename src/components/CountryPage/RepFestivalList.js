import RepFestival from "./RepFestival";
import "../../css/CountryPage/RepFestivalList.css";
function RepFestivalList({ data = [] }) {
  const today = new Date();
  // 오늘보다 축제 마지막 날짜가 큰 것으로 데이터 필터링
  const filterDateArray = data.filter((item) => new Date(item.date[1]) > today);

  // 랜덤값 3개를 고르는 함수
  const getRandomIndexes = (max, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  // 카드로 출력할 축제데이터의 인덱스 구한다.
  let randomIndexes;
  if (filterDateArray.length < 3)
    randomIndexes = filterDateArray.map((el, ix) => ix);
  else randomIndexes = getRandomIndexes(filterDateArray.length, 3);

  return (
    <div className="RepFestivalListArea">
      {/*랜덤으로 선택된 3개의 축제정보를 카드형태로 출력 */}
      {randomIndexes.map((index, ix) => (
        <RepFestival key={ix} data={filterDateArray[index]} />
      ))}
    </div>
  );
}

export default RepFestivalList;
