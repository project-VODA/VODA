# :ear: VODA  
**V oice-**   
**O ver**   
**D iverse**   
**A ssistance**  

<img src="./exec/resource/img/VODA_logo.png" width="100" height="100">
<br/> <br/>   

## 💌 프로젝트 개요  

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
| 최규헌 | BE & FE | BE api 구현 / FE axios, Redux, style / 일정 관리 |
<br/>

## 🕹️ 기술 스택

### Front
- React
- Redux


### Back
- Spring Boot
- JPA
- MyBatis
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



## 🧵 환경 설정  

- [바로가기](./exec/포팅메뉴얼.md)  


## 🔎 서비스 소개  

### 회원 관리 

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

### 고객의 소리함

**고객의소리함 목록 및 상세보기** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리목록.gif) <br/>

**고객의소리함 글 작성** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리글작성.gif) <br/>

**고객의소리함 글 수정 및 삭제** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리수정삭제.gif) <br/>

**고객의소리함 댓글 작성** <br/>
![Alt text](./exec/resource/GIF/고객의소리함/고객의소리댓글.gif) <br/>

### 화면 모드

**화면 모드 토글로 변경** <br/>
![Alt text](./exec/resource/GIF/스크린타입/홈화면_테마토글.gif) <br/>

### 영상 통화

**친구검색 및 추가** <br/>
![Alt text](./exec/resource/GIF/영상통화/친구추가.gif) <br/>

**통화 알림** <br/>
![Alt text](./exec/resource/GIF/영상통화/통화알림.gif) <br/>

### 표정 인식

**표정 듣기** <br/>
![Alt text](./exec/resource/GIF/영상통화/표정듣기-자막.gif) <br/>

**표정 보내기** <br/>
![Alt text](./exec/resource/GIF/영상통화/표정보내기-자막.gif) <br/>

### 색상 인식

**색상인식** <br/>
![Alt text](./exec/resource/GIF/색상인식/색상인식.gif) <br/><br/>


## 프로젝트 산출물
### DB ERD
![Alt text](./exec/resource/img/ERD.png) <br/>

### 요구사항 명세서
![Alt text](./exec/resource/img/요구사항명세서.JPG) <br/>

### API명세서
![Alt text](./exec/resource/img/api1.PNG) <br/>
![Alt text](./exec/resource/img/api2.PNG) <br/>
![Alt text](./exec/resource/img/api3.PNG) <br/>
![Alt text](./exec/resource/img/api4.PNG) <br/>

### 아키텍쳐 다이어그램
![Alt text](./exec/resource/img/아키텍쳐.png) <br/>

## 📽️ UCC
[유튜브](https://youtu.be/ypS_xI9M2W0)

## 💎 느낀 점(소감)

- 고세훈  
  - 실제 시각 장애인의 입장을 고려하기 위해 안대를 쓰고 사용해보며 진정한 의미의 UX가 뭔지 정말 고민해보고 생각하며 접근성과 컴포넌트 배치 등을 생각하며 개발할 수 있던 귀중한 경험이었습니다. 협업의 시너지가 어느 것인지도 배웠고, 훌륭한 팀원들을 만나 결과물이 잘 나온 것 같아 만족했던 프로젝트였습니다.

- 김민재  
  - 프로젝트를 하나부터 열까지 모든 기술 스택과 과정을 관리한 첫 번째 프로젝트였습니다. 뼈대를 만들고 디자인적 요소를 넣고, 기능을 하나씩 만들어 완벽한 발표까지 진행하여 최종 최우수 프로젝트로 선정되었습니다. 성공적인 결과를 내는 데 있어서는 **일정 관리**와 **팀원들과의 협업**이 가장 중요했습니다.  
팀장은 아니지만 테크 리더로서 기술적인 부분을 성장시켰고, 책임감 있는 팔로위쉽에 대해서 배웠습니다. 개인적으로 프로젝트 진행에 있어 가장 중요하게 생각한 것은 MVP였습니다. 서비스에서 많이 쓰는 용어이지만 애자일한 개발 관리에 있어서도 최소 기능부터 최종 목표까지 마찬가지라 생각했습니다. 내 파트 외에 다른 파트(Front - React, Back - SpringBoot)의 공부도 병행하여 기술적 부분을 이해할 수 있었던 것도 큰 이유라고 생각합니다.  
무엇보다 중요한 것은 팀원들과의 소통이었습니다. JIRA, Notion을 이용한 협업과 commit 메시지를 통해 서로의 작업 척도를 알 수 있었고 데일리 스크럼과 주간 스프린트로 업무 정리 및 향후 프로젝트 관리에 있어 효율적이었습니다. 계속해서 의견을 나누고 얘기하다 보니 갈등 상황도 적었고 업무 처리도 빠르게 할 수 있었습니다.  
프로젝트 진행 그 자체로도 경험치가 되겠지만, 무엇보다 함께 한 책임감 넘치는 사람들 덕분에 더욱 멋진 프로젝트 결과물, 값진 추억과 인연을 만들었습니다. 팀원 모두 감사합니다!! (_ _)

- 김지원  


- 나건  


- 윤선희  
  - 실제 사용자의 피드백을 받아가며 서비스를 개발해나가는 소중한 경험이었습니다. 또한 배포를 통해서 저희 서비스의 아키택처에 대해서 깊게 고민할 수 있는 시간이어서 좋았습니다. 7주간의 짧은 개발 기간동안 탄탄한 팀워크로 좋은 결과물을 낼 수 있어서 팀원들에게 감사하다는 말을 전하고 싶습니다.


- 최규헌  
  - 우선 프로젝트 주제에 대해서 모든 팀원이 깊게 고민하고 먼저 생각하면서 진행했기 때문에 단순 프로젝트를 위한 프로젝트가 아닌 실제 서비스를 개발하고 있다는 생각이 들어 뜻 깊었습니다. 개인적인 수확으로는 Spring Boot, JPA, React에 대한 숙련도를 쌓을 수 있었고 실제 코딩을 많이 해본 것이 도움이 많이 될 것 같습니다. 또한 다른 사람에게 내가 맡지 않은 부분을 오롯이 맡겨본 경험이 이번이 처음 일만큼 팀원들이 믿음직스럽고 개발외적인 팀워크도 잘 맞았어서 좋은 인연을 맺은 것 같습니다. VODA팀 다들 고생했어!!



## 💾 버전 관리

- ver1.0.0
  - 버전 관리
  - 컴포넌트 추가

- ver1.0.1
  - Openvidu 라이브러리 추가
  - tensorflow의 Face-api.js 적용

- ver1.0.2
  - 영상 통화 관련 내용 추가(알림 등)
  - 친구 기능들 추가
  - 사용자 인증 인가 (Redux 적용)
  - 최근 통화 목록 조회

- ver1.0.3
  - flask 서버 연결
  - 색상 인식 모델 추가

- ver1.0.4
  - Yolo V5로 학습시킨 화장품 모델 인식 추가

