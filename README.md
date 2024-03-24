**프로젝트 소개**

**ZEUSE**는 사용자가 자신의 블로그(하우스)를 만들고 관리할 수 있는 서비스입니다. 자신의 개성을 담아 하우스를 꾸밀 수 있고, 용도에 따라 다양한 방식으로 사용할 수 있도록 확장성 있게 기획하였습니다.

**프로젝트 기간**

2024.03 \~ 진행중

**개발 환경**

React.js, Next.js, Typescript, Supabase, Zustand\
Tailwindcss, shadcn/ui

**페이지**

**깃허브** <https://github.com/wisdom-13/zeuse>

**데모** <https://zeuse.vercel.app/zihye>

<br><br>

**사용 기술**

*   하이브리드 렌더링을 위하여 **Next.js**를 기반으로 서비스를 구축하였습니다.
*   **Supabase**를 사용하여 데이터베이스를 구축하여 사용자 정보와 이미지 등의 파일을 관리할 수 있도록 하였습니다.
*   데이터의 상태 관리를 위해 **Zustand**를 사용하였고, 사용자의 액션(테마 변경 등)에 따라 화면이 즉각적으로 변경되도록 구현하였습니다.
*   **shadn/ui**를 사용하여 재사용 가능하고, 일관성 있는 UI를 구현하였습니다.

**주요 기능**

*   **블로그 커스터마이징**: 자신의 개성을 담아 블로그를 꾸밀 수 있습니다. 로고/배경 이미지와 Mode, Color, Radius 등의 디자인 요소 또한 변경할 수 있습니다. 또한 메인 페이지를 위젯 형식으로 자유롭게 구성할 수 있습니다.
*   **게시판/포스팅**: 사용자가 게시판 목록을 자유롭게 구성할 수 있으며, 게시판 별로 리스트형/갤러리형 등 다양한 보기 형식을 설정할 수 있습니다. blocknote 에디터를 사용하여 블록 형식으로 포스트를 작성할 수 있습니다. 
*   **공동 관리자**: 블로그에 공동 관리자(패밀리)를 설정하여 여러 사람이 함께 블로그를 관리하고 포스팅 할 수 있습니다. 

**차후 확장 기능**

*   **위젯의 확장 : 기**존의 이미지, 게시판, 시계, 프로필에서 추가로 포스트 본문, 텍스트 등의 기능 위젯을 추가하고 위젯 별로 링크, 테두리, 배경색을 각각 지정할 수 있도록 위젯 설정 항목을 추가.
*   **공동 관리자(패밀리) 권한 설정 : **패밀리 기능을 확장하여 일반 사용자가 블로그 (하우스)에 가입하고, 글 작성 등의 기능을 사용할 수 있게 하여 다수의 유저가 이용할 수 있는 커뮤니티형 하우스를 생성할 수 있도록 권한 설정 기능을 보완.
*   **블로그(하우스) 간의 교류** : 운영 중인 하우스 목록을 확인할 수 있고, 주제가 맞는 하우스끼리 이웃을 맺어 서로의 하우스에 대한 소식을 받을 수 있도록 이웃 시스템을 추가.
