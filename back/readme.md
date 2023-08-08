## Back End

- ver0.0.0) 최초 브랜치 생성

- 23.07.20
    - 회원가입 api 구현 (BCrypt 적용)
    - 로그인 api 구현 (JWT적용)
    - 로그아웃 api 구현
    - 비밀번호 재설정 api 구현
    - 개인정보 조회 api 구현
    - 테스트 환경 구축

- 23.07.21
    - 로그인 / 로그아웃 api 보완
    - 메일 서비스 구축 (회원가입 / 비밀번호 찾기 시 임의 문자열 메일로 전송)
    - 개인정보 수정 api 구현

- 2023.07.24 YSH
  - 회원탈퇴 api
  - 탈퇴한 회원의 회원정보 이외의 데이터 삭제 스케쥴링 (매주 금요일 17시에 삭제하도록 스케줄링 작업)

- 23.07.24 choi
  - 댓글 목록/작성/수정/삭제 api 구현
  - DB DDL 업데이트

- 23.07.24 KJW
  - DB articles 테이블 추가
  - 게시글 목록/상세/등록/수정/삭제 api 구현

- 23.07.25 choi
  - 친구 목록/삭제 api 구현
  - 전체 컨트롤러 예외처리 / HTTP Status 코드 리턴

- 23.07.25 KJW
  - 유저 검색 api 구현
  - 친구 추가 api 구현
  - 사용자 설정 조회/변경 api 구현
  - 회원가입시 기본값으로 사용자 설정 등록하도록 수정

- 23.07.27 KJW
  - 로그아웃 api GET에서 POST로 변경
  - Article의 articleRegTime TimeStamp에서 String으로 변경

- 23.08.02 Choi
  - 친구 삭제 레포지토리 변경
    - 기존 Friend 객체를 받아서 삭제하는 방식 -> friendNo 로 삭제하는 방식
  - 친구 api 관련 dto 추가
  - 유저 검색 쿼리 정렬 기준 추가
    - 친구인 유저부터 출력
  - 친구 리스트 출력 쿼리 수정

- 23.08.01 NG
  - jwt token을 활용한 Interceptor 구현
  
- 23.08.02 YSH
  - 영상통화 걸기 api 구현
  - 영상통화 받기 api 구현
  - 영상통화 끊기 api 구현
  - 영상통화를 걸면 VODA DB에 callhistory 데이터 insert 후 openvidu 미팅룸을 생성한다.
  - 영상통화를 끊으면 VODA DB안 해당 callhistory 데이터의 status, endtime을 업데이트한다.

- 23.08.03 Choi
  - 유저 검색 쿼리 변경

- 23.08.08 Choi
  - 고객의 소리함 작성시간 구분 로직 추가