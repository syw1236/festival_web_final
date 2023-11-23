# README.md

## 실행순서

### `1 .npm install`

'npm install' 명령을 통해 package.json을 참조하여 필요한 라이브러리를 node_modules디렉토리에 설치

### `2. 카카오맵 API 발급`

- <https://apis.map.kakao.com/>에서 카카오맵 API 키를 발급받은 후,
  public폴더>index.html파일의 script 태그 src= "[here]" here 부분에 KAKAO_MAP_API_KEY를 발급받은 키로 대치
- 카카오맵 API 콘솔의 플랫폼 항목에서 Web 플랫폼 등록 버튼을 클릭하여 http://localhost:3000을 입력하여 저장

### `3. npm start`

`npm start` 명령을 통해 프로젝트를 'http://localhost:3000'의 주소로 실행

    npm install
    npm start

## 프로젝트 구성

##### 실행시킨 상태에서 밑의 링크를 클릭하면 페이지 이동

### 메인 페이지 - 상단 탭 홈에 해당

#### 메인 페이지는 <http://localhost:3000/>으로 라우팅

- swipper 기능
  랜덤으로 6가지 축제 정보(이미지, 축제 이름, 위치)를 보여주며 <U>자세히 보기</U>로 해당 축제의 자세한 정보 확인
- 검색 기능
  검색으로 원하는 축제 정보 확인 & 연관검색어 기능
- 현재 진행 중인 축제 정보
- 인기있는 축제 정보

---

### 지역 축제 페이지 - 상단 탭 축제정보에 해당

#### 지역 축제 페이지 <http://localhost:3000/CountryDetail>으로 라우팅

- 지역별로 분류된 다양한 축제 정보 확인
- 지역별로 진행되는 축제 중 인기있는 축제들과 진행 중인 축제 확인
- 캘린더를 통해 원하는 날짜에 진행 중인 지역 축제 확인

---

### 축제 상세페이지

#### 상세 페이지 <http://localhost:3000/festival_detail/축제ID>으로 라우팅

- 메인페이지/지역 축제 페이지/검색 페이지/테마 페이지 에서 하나의 축제 클릭 시 출력되는 페이지
- 해당 축제의 세부 정보 파악

---

### 검색페이지 - 상단 탭 검색에 해당

#### 상세 페이지 <http://localhost:3000/SearchList>으로 라우팅

- 검색어를 통해 해당하는 축제 정보를 확인
- 지역별로 필터링 & 입력어 검색한 상태에서 필터링 가능

---

### 테마페이지 - 상단 탭 테마에 해당

#### 테마 페이지 <http://localhost:3000/tabPrint>으로 라우팅

탭에 적힌 각 주제에 알맞는 데이터들을 출력하여 추천해주는 서비스

- 사용자가 관심있는 테마별 축제 추천 서비스( 최대 3개까지 )
- 탭 종류: 야경, 새해, 먹거리, 사계절(봄, 여름, 가을, 겨울)
- 탭 내용: 주제와 관련된 해시태그
- 기능: 해시태그와 축제 이름이 겹치는 데이터들을 출력
- 데이터 출력: 마우스 포인터가 올라가면 세부위치 정보가 포스터 위에 오버레이되며 포스터를 클릭하면 해당 축제의 상세 정보 페이지로 이동
