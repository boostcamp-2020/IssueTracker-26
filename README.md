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



# 👨‍👩‍👦‍👦그라운드 룰

- 미팅 규칙

  - `데일리 스크럼` 후 `wiki`에 기록
    - `어제 했던 일`
    - `오늘 할 일`
    - `현재 어려움을 겪는 일`
    - `컨디션`

  - 짝코딩 : 아침 🌄
  - merge 타임 : 스크럼 이후? 오후 6시( 추 후 변경 )

- 지각

  - 데일리 스크림 서기 역할을 맡아서 하기

- 활동

  - 희망자 → 라이브 줌코딩 참여

- Git 컨벤션
  - 커밋

    - 단위 커밋메세지 `미리 작성 후 개발` (권유)
      커밋의 단위는 `함수의 단위`를 권장

    - 형식 : {type}: {detail(ko)}

      - type은 소문자

      - Type

      | Type       | description                                                  |
      | ---------- | ------------------------------------------------------------ |
      | `feat`     | a new feature                                                |
      | `fix`      | a bug fix                                                    |
      | `docs`     | changes to documentation                                     |
      | `style`    | formatting, missing semi colons, etc; no code change         |
      | `refactor` | refactoring production code                                  |
      | `test`     | adding tests, refactoring test; no production code change    |
      | `chore`    | updating build tasks, package manager configs, etc; no production code change |

  - **풀리퀘스트**

    - 단위 : Issue와 동일(기능)

    - 형식 제목 : #[issue] - {detail}

    - 내용

      - `뭘 했는지?`(어떻게 했는지 등)

      - `왜 했는지?`

      - `참고자료`

        - 스크린샷

        

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

#### Back-end

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