# 이벤트 관리 웹 애플리케이션 개발 과제

종류 : 개인 프로젝트 (과제) <br/>
개발 기간 : 5.28 ~ 5.29 <br/>
기술 스택 : React, Context, TailwindCSS, typescript, json-server <br/>
내용 : 이벤트 티켓 관리 웹 <br/> 
- json-server를 사용하여 Mock API 이벤트를 생성,수정,삭제 기능 구현.
- Context를 통해 데이터를 필터링, 정렬하고 페이지네이션을 구현.

## 설치 방법


1. 클론
```
git clone https://github.com/hasangwon/event-manage.git
```
```
cd event-manage
```
2. 설치 (npm 기준)
```
npm install
```
3. 실행 (json server를 실행시키기 위해 터미널 2개 필요)
```
npm run server
```
```
npm run start
```


## 프로젝트 구조

```
src/
├── api/                             # API 호출 관련 파일들
│   └── events.ts                      - 이벤트 관련 API 호출 함수들
├── components/                      # 재사용 가능한 컴포넌트들
│   ├── DeleteModal.tsx                - 삭제 확인 모달 컴포넌트
│   ├── EventCard.tsx                  - 단일 이벤트 카드 컴포넌트
│   ├── EventForm.tsx                  - 이벤트 추가/수정 폼 컴포넌트
│   ├── EventList.tsx                  - 이벤트 목록 컴포넌트
│   └── Pagination.tsx                 - 페이지네이션 컴포넌트
├── context/                         # Context API 관련 파일들
│   ├── EventContext.tsx               - 이벤트 관련 상태 관리 Context
├── hooks/                           # custom hooks
│   ├── EventContext.tsx               - 이벤트 관련 custom hook
├── pages/                           # 페이지 컴포넌트들
│   ├── EventListPage.tsx              - 이벤트 목록 페이지
│   └── EventFormPage.tsx              - 이벤트 추가/수정 페이지
├── types/                           # 타입 정의 파일들
│   └── EventType.ts                   - 이벤트 관련 타입 정의
├── utils/                            # 유틸 파일들
│   └── dateTils.ts                   - date 변경 관련 util
├── App.tsx                          - 애플리케이션의 루트 컴포넌트
├── index.css                        - global css
└── index.tsx                        - 애플리케이션의 진입점
db.json                              - JSON 서버를 위한 Mock 데이터
```

## 화면
<img width="400" alt="스크린샷 2024-05-28 오후 6 08 09" src="https://github.com/hasangwon/event-manage/assets/75872687/5dd7386b-d48a-4455-ac7d-f2b2558d3645">
<img width="400" alt="스크린샷 2024-05-28 오후 6 08 20" src="https://github.com/hasangwon/event-manage/assets/75872687/8405dfff-b8c1-40b9-90ed-e15c254091ba">

