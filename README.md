# :ear: VODA  
**V oice-**   
**O ver**   
**D iverse**   
**A ssistance**  

<img src="../exec/resource/img/VODA_logo.png" width="100" height="100">
<br/> <br/>   

## 프로젝트 개요  
SSAFY 9기 2학기 공통 프로젝트
<br/>  
2023.07.04 ~ 2023.08.18(7주)

### 기획 배경
시각장애인이 웹서비스 사용에 있어서 비장애인과 비교하여 불편함이 많음.
- 웹페이지에 있는 많은 컴포넌트로 인해 정보인지의 어려움
- 스크린리더기로 인식이 안되는 웹서비스 또는 이미지의 경우 정보 획득 불가

기존 서비스
- 설리반+ : 사진을 찍어서 이미지 분석
- BeMyEyes : 봉사자와 랜덤 매칭 영상통화

**VODA -> 실시간으로 지인과 영상통화**   
<br/> 


## :heart: 역할

|  |  Part | Detail |
| --- | --- | --- |
| 고세훈 | FE | 백/ AI |
| 김민재 | PM & AI | 프로젝트 관리 / third-party api 적용, 색상 & 객체 인식 모델 적용 |
| 김지원 | BE | AI |
| 나건 | BE | FE |
| 윤선희 | BE | FE |
| 최규헌 | BE | FE |
<br/>

## 기술 스택

### Front
- React


### Back
- Spring Boot
- JPA
- MySql


### AI Model
- TF; Face-api.js
- Flask
- OpenCV(k-means clustering & k-NN algorithm)
- Yolo V5


### Infra
- AWS EC2
- Nginx
- Docker



## 환경 설정  

- [바로가기](./exec/포팅메뉴얼.md)  


## 서비스 소개  

- 회원 관리  
**회원가입** <br/>
![Alt text](./exec/resource/GIF/회원관리/회원가입.gif) <br/>

**비밀번호 변경 및 정보수정** <br/>
![Alt text](./exec/resource/GIF/회원관리/비밀번호변경_정보수정.gif) <br/>

**임시 비밀번호 발급** <br/>
![Alt text](./exec/resource/GIF/회원관리/임시비밀번호발급.gif) <br/>

**환경설정** <br/>
![Alt text](./exec/resource/GIF/회원관리/환경설정.gif) <br/>

**로그인** <br/>
![Alt text](./exec/resource/GIF/회원관리/로그인.gif) <br/>

- 고객의 소리함
**고객의소리함 목록 및 상세보기** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리목록.gif) <br/>

**고객의소리함 글 작성** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리글작성.gif) <br/>

**고객의소리함 글 수정 및 삭제** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리수정삭제.gif) <br/>

**고객의소리함 댓글 작성** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리댓글.gif) <br/>

- 화면 모드
**화면 모드 토글로 변경** <br/>
![Alt text](./exec/resource/GIF/스크린타입/홈화면_테마토글.gif) <br/>

- 영상 통화
**친구검색 및 추가** <br/>
![Alt text](./exec/resource/GIF/영상통화/친구추가.gif) <br/>

**통화 알림** <br/>
![Alt text](./exec/resource/GIF/영상통화/통화알림.gif) <br/>

- 표정 인식
**표정 듣기** <br/>
![Alt text](./exec/resource/GIF/영상통화/표정듣기-자막.gif) <br/>

**표정 보내기** <br/>
![Alt text](./exec/resource/GIF/영상통화/표정보내기-자막.gif) <br/>

- 색상 인식
**색상인식** <br/>
![Alt text](./exec/resource/GIF/색상인식/색상인식.gif) <br/><br/>


## 프로젝트 산출물
### DB ERD
![Alt text](./exec/resource/img/ERD.png) <br/>

### 요구사항 명세서
![Alt text](./exec/resource/img/요구사항명세서.JPG) <br/>

### API명세서


### 아키텍쳐 다이어그램
![Alt text](./exec/resource/img/아키텍쳐.png) <br/>


## 느낀 점(소감)




## 버전 관리

- ver0.1.1
  - 최초 front / back branch merge

- ver1.0.0
  - 버전 관리
  - 컴포넌트 추가

- ver1.0.1
  - Openvidu 라이브러리 추가
  - tensorflow의 Face-api.js 적용

- ver1.0.2
  - 영상 통화 관련 내용 추가
  - 친구 기능들 추가

- ver1.0.3
  - flask 서버 연결
  - 색상 인식 모델 추가

- ver1.0.4
  - Yolo V5로 학습시킨 화장품 모델 인식 추가

