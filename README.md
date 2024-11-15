# ⛅ Harulog

![하루로그](https://github.com/user-attachments/assets/f1ab8c87-170d-4813-832b-c1417c091132)

#### 프로젝트 소개

오늘의 하루를 기록하는 SNS 프로젝트 입니다.

#### 프로젝트 진행기간

2024.10 ~ 2024.11 (4주)

#### 프로젝트 배포링크

[Harulog 배포링크](https://harulog.vercel.app/)

##### 테스트 계정

> ID: test1@test.com  
> PW: qwer1234
> <br/>

## ☁ 실행방법

1. 레포지토리 복제 후 의존성 설치

```
$ git clone https://github.com/ingdol/harulog-sns-project.git
$ cd harulog
$ npm install
```

2. 개발 서버 가동

```
$ npm run dev
```

3. 브라우저에서 실행

```
http://localhost:3000/
```

## ☁ 기술스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">

<br />

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">

<br/>

## ☁ 주요기능

##### 토글을 열면 화면을 확인하실 수 있습니다

#### <details><summary>로그인 / 회원가입</summary> <br/>![로그인 / 회원가입](https://github.com/user-attachments/assets/d56fcc6e-db98-4c1a-8442-8ae4330d3c52)<br/></details>

- 폼 유효성 검증
- 로그인 후 전역상태로 회원정보 관리

#### <details><summary>(메인) 게시글 리스트</summary> <br/>![게시글 리스트](https://github.com/user-attachments/assets/f1ab8c87-170d-4813-832b-c1417c091132)<br/></details>

- 데이터 프리패칭을 통한 무한 스크롤 기능
- 유저의 게시글일 경우, 게시글 수정 및 삭제 기능

#### <details><summary>게시글 작성 모달</summary> <br/>![게시글 작성 모달](https://github.com/user-attachments/assets/1a45f151-c109-4c1d-83f4-10649ccf436d)<br/></details>

- 이미지 업로드 기능
- text 기반의 게시글 작성

#### <details><summary>게시글 상세 모달</summary> <br/>![게시글 상세](https://github.com/user-attachments/assets/37360152-37dc-4e8b-a721-06cd101791f0)<br/></details>

- 게시글 상세 조회
- 댓글 및 좋아요 기능
- 댓글 리스트 무한 스크롤 기능

#### <details><summary>프로필 페이지</summary> <br/>![유저 프로필](https://github.com/user-attachments/assets/e3b3e30a-02e3-4041-b4d5-12093cd84d49)<br/></details>

- 회원 간의 팔로우/팔로잉 기능
- 회원 프로필 조회 및 상세 게시글 조회

<br/>

## ☁ 성능 최적화

## ☁ 트러블 슈팅

## ☁ 기술적 의사결정

<br/>

## ☁ 아키텍쳐

![아키텍쳐](https://github.com/user-attachments/assets/ae0bfe11-21f4-44c3-a721-5185171f6b79)
<br/>

## ☁ 폴더구조

```
harulog
├─ public
│  └─ images
├─ src
│  ├─ app # 페이지
│  │  ├─ (afterLogin)
│  │  │  ├─ (main) # 메인 (게시글 리스트)
│  │  │  │  ├─ @search
│  │  │  ├─ @modal # 게시글 작성 및 상세 모달
│  │  │  │  ├─ (.)feed
│  │  │  │  │  ├─ create
│  │  │  │  │  ├─ edit
│  │  │  │  │  │  └─ [id]
│  │  │  │  │  └─ [id]
│  │  │  ├─ @sidebar
│  │  │  ├─ feed
│  │  │  │  ├─ create
│  │  │  │  ├─ edit
│  │  │  │  │  └─ [id]
│  │  │  │  └─ [id]
│  │  │  └─ profile # 프로필
│  │  │     └─ [nickname]
│  │  ├─ (beforeLogin)
│  │  │  ├─ login
│  │  │  ├─ signout
│  │  │  └─ signup
│  │  ├─ api # route handlers
│  ├─ components
│  │  ├─ Buttons
│  │  ├─ Common
│  │  ├─ Inputs
│  │  ├─ Menus
│  │  ├─ Modals
│  │  └─ pages # 각 페이지별 컴포넌트
│  ├─ constants.ts
│  ├─ middleware.ts
│  ├─ providers
│  ├─ services # tanstack query API 관리
│  │  ├─ auth
│  │  ├─ comment
│  │  ├─ feed
│  │  ├─ follow
│  │  ├─ like
│  │  ├─ profile
│  │  └─ storage
│  ├─ static
│  │  └─ fonts
│  ├─ stores # zustand 상태 관리
│  │  ├─ auth
│  │  └─ feed
│  └─ utils
│     ├─ supabase
│     └─ time
├─ tailwind.config.ts
├─ tsconfig.json
├─ types_db.ts
└─ yarn.lock

```
