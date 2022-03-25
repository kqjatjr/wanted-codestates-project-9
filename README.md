# 원티드 프리온보딩 기업과제 - 넥슨코리아

## 기술스택

- React, TypeScript, Redux

## 배포 주소

https://dapper-crostata-47cad6.netlify.app/

## 제작 구현 리스트

### 메인 페이지

- [x] 유저의 아이디를 검색하고 해당 유저의 전적을 검색할 수 있어야 한다.
- [x] 메뉴바의 홈, 랭킹 버튼을 누르면 해당 이름에 맞는 페이지가 렌더링 되어야 한다.
  - [x] 전적 검색은 어디에도 속해 있지 않다.
  - [x] 메뉴바의 홈을 제외한 전적검색, 랭킹에는 닉네임 검색하기 기능이 추가되어야 한다.

### 전적 검색 페이지

- [x] 해당 유저 정보는 아이디, 레벨이 표시되어야 한다.
- [x] 종합전적, 승률, 완주율, 리타이어율 이 표시되어야 한다.
- [x] 순위변동 추이가 그래프로 표시되어야 한다.
- [x] 전적은 통합, 매우빠름, 무한 부스터 탭으로 나뉘어져 있다.
- [x] 전적리스트에서 리타이어 제외 토글버튼을 누르면 리타이어는 제외한 전적이 나열되어야 한다.
- [x] 하단에는 최근 게임한 전적 기록들(시간, 순위, 트랙, 카트, 완주시간)이 나열되어야 한다.

### 랭킹페이지

- [x] 유저들이 플레이한 게임타입에대한 필더링 버튼이 있어야한다.
- [x] 해당필터를 클릭하면 해달 매치의 게임의 자체적인 순위 점수표를 의거하여 순의가 메겨진다.
- [x] 1등부터 3등까지는 따로표시가되며, 나머지 등수는 하단에 나열된다.

## 애니메이션

- 메인화면 첫등장시 배찌와 다오가 좌우에서 등장한다.
- 전적 검색을 하였을때, 승률과 리타이어률이 1퍼센트부터 점점 올라간다.
- 전적 검색을 하였을때, 최근 매치기록들이 하단에서 올라오며 등장한다.
- 전적 검색 로딩시 로딩원이 돌면서 중앙에 다오가 카트를 운전하고 있다.
- 랭킹페이지에서 필터를 변경할시 3개의 점이 순차적으로 깜박이며 로딩을 표기한다.

## 그래프

- 전적 확인 페이지의 원형 그래프와 선형그래프 2가지
  - 원형그래프 : conic-gradient를 이용하여 구현.
  - 선형그래프 : 라이브러리를 이용하여 구현

## 구현하며 생각했던 점

- 랭킹페이지 구현시 200개의 데이터를 가지고 랭킹을 집계하는 과정에서 집계 데이터의 수가 적어 랭킹집계에 대한 신뢰도가 많이 떨어졌습니다. 구현시간이 부족하여 진행하진 못했지만. batch를 돌려서 주기적으로 데이터를 수집하고 더 많은 수의 데이터를 가지고 집계를 했어야 했다는 생각이 들었습니다.
