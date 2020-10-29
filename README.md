# 🎯IssueTracker



## 🤔설명   

- 이슈를 관리해주는 도구



## 💡 주요 기능   

- 소셜로그인 가능 ( GitHub )
- 이슈 생성 및 Label, Assignee, Milestone, Comment 등록 및 관리
- 다양한 조건으로 이슈 필터링
- 이슈의 상태에 따라 Milestone을 이용한 일정관리




## 🤝 팀 소개   

#### 👦 | 👩 | 👨 | 👲

- J086 박주영 ⚔️
- J147 이소정 😈
- J175 장우영 🌌
- J202 차효준 🐶



## 📆 프로젝트 일정   

- #### Sub PJT I    ( 2020-10.26 ~ 10.30 )

  - 팀 그라운드 룰 및 컨벤션 결정
  - 기획서 분석 및 기술 명세서 작성
  - 개발 환경 셋팅 및 프로젝트 생성
  - DB 설계 및 ERD 작성
  - Back-End API 구현 ( TDD 기반 )
    - 회원가입 및 로그인 API 구현
    - userName 중복체크 API 구현
    - 마일스톤 및 라벨 생성 API 구현
    - 이슈 목록 및 상세보기 API 구현
  - Server 환경 설정  및 배포

- #### Sub PJT II   ()

  

- #### Sub PJT III  ()



## 📝시스템 아키텍쳐

![1111](https://user-images.githubusercontent.com/52816790/97554003-843c9700-1a19-11eb-9e4e-a673bdc56843.jpg)



## 🏃 Quick Start

#### Front-end

:one:  **npm install** 명령어를 실행시켜 주세요.

:two:  **npm start** 명령어를 실행시켜 주세요.





## 🔴 Server

### 1. ERD

![image](https://user-images.githubusercontent.com/44664867/97531923-9d811b80-19f8-11eb-821d-9e954811d3dc.png)

### 2. API 문서

- 회원가입 API

  POST : http://127.0.0.1:3000/api/user

  BODY : { userName, password }

- 중복체크 API

  POST : http://127.0.0.1:3000/api/userName

  BODY : { userName }

- 이슈목록 보기 API

  GET : http://127.0.0.1:3000/api/issue

- 마일스톤 생성 API

  POST : http://127.0.0.1:3000/api/milestone

  BODY : { title, dueDate(optional), description(optional) }

## 🔵 Client