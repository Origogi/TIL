# Node Js 개념 정리

## 1. 특징

1. 자바스크립트 런타임
2. 싱글 쓰레드
3. 논블로킹 I/O
4. 이벤트 기반

### 1) 자바스크립트 런타임

- 런타임이란? 특정 언어로 만든 프로그램들을 실행할 수 있는 환경을 뜻한다.
- V8 엔진 기반으로 동작

### 2) 싱글 쓰레드

### 3) 논블록킹 I/O

- I/O : File, Database, network 읽고 쓰는 행위
- Non-blocking I/O : I/O 작업이 완료될 때까지 기다리지 않고 다른 작업을 처리하는 방식, I/O 작업이 완료되면 콜백을 통해 알림을 받는다.

### 4) 이벤트 기반

- I/O 작업이 완료되면 이벤트를 발생시키고 이벤트 리스너가 이벤트를 받아서 해당 콜백을 호출한다.

## 2. Node JS 런타임

### 구성

- Node JS Application : 자바스크립트로 작성된 어플리케이션, 씽글 쓰레드 기반이다.
- Node JS API : Node JS Application 에서 사용할 수 있는 API,  멀티 쓰레드 기반이다.
  - V8 : 자바스크립트 엔진
  - libuv : Non-blocking I/O 를 지원하는 라이브러리
  - llhttp : HTTP 파서
  - Open SSL : 암호화 라이브러리
  - c-ares : DNS 라이브러리
  - zlib : 압축 라이브러리
- 메모리 힙
- 콜스택
- 태스크큐 : 비동기 동작이 완료되면 처리해야할 콜백이 등록이 된다.
- 이벤트 루프 : 콜 스택이 비어있으면 태스트큐로부터 태스크를 꺼내서 콜스택에 적재한다.

Node JS 어플리케이션은 씽글쓰레드이고 Node JS API 는 멀티쓰레드로 동작한다.

## 3. NPM

Node Package Manager

- numerous packages
- resuable templates

### 1) package.json

- 프로젝트의 정보를 담고 있는 파일
- 프로젝트의 이름, 버전, 라이센스, 의존성 등을 명시한다.
- `npm init` 명령어를 통해 생성할 수 있다.
- `npm install` 명령어를 통해 의존성을 설치할 수 있다.

### 2) node_modules

- 의존성을 설치하면 node_modules 디렉토리가 생성된다
- Git 에 보통 포함하지 않는다.

### 3) package-lock.json

- 의존성을 설치하면 package-lock.json 파일이 생성된다.
- 의존성 트리를 재현하기 위한 파일이다.

