# 📄IssueTracker



## 🤔설명   

#### 



## 💡 주요 기능   

#### 




## 🤝 팀 소개   

#### 👦 | 👩 | 👨 | 👲

- J086 박주영 ⚔️
- J147 이소정 😈
- J175 장우영 🌌
- J202 차효준 🐶



## 📆 프로젝트 일정   

- #### Sub PJT I    ()

  

- #### Sub PJT II   ()

  ##### 

- #### Sub PJT III  ()

  



## 📝시스템 아키텍쳐





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

충돌 실험1