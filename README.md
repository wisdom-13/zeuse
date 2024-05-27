# ⚡️ ZEUSE

취향을 담아 만드는 내 하우스

<img src="https://github.com/wisdom-13/zeuse/assets/77341912/588117a5-0a4c-4072-a0cc-b8b32fe7d7ff" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

**서비스 URL** : https://zeuse.vercel.app<br>
**모델 하우스** : https://zeuse.vercel.app/zeuse<br><br>


## 프로젝트 소개
* ZEUSE는 개인 블로그(하우스)를 만들고 관리할 수 있는 서비스입니다.
* 개발 지식이 없는 사용자도 쉽게 블로그를 꾸밀 수 있도록 다양한 커스텀 기능을 제공합니다.
* 다양한 목적으로 사용할 수 있도록 여러 유형의 게시판을 제공합니다.<br><br>


## 개발 환경
* **개발 인원** : 1인
* **개발 기간** : 2024.03 ~ (진행중) 
  * 1차 배포 : 2024.05.27
* **사용 기술**
  * **Front** : React.js, Next.js, Typescript
  * **Back** : Supabase
  * **Style** : Tailwindcss, shadcn/ui
  * **배포** : vercel<br><br>

## 채택한 개발 기술

**상태 관리 : Zustand**

테마 옵션 변경 등 실시간으로 사용자에게 피드백을 제공하고, 불필요한 props 전달을 줄이기 위하여 상태 관리 툴을 도입하였습니다. 
* Zustand는 React의 훅을 기반으로 하여, 기존의 React 상태 관리 방식과 잘 맞아 떨어지며, React의 다른 훅들과 함께 사용하기에도 용이합니다.
* Zustand는 필요할 때만 상태를 업데이트하여 불필요한 렌더링을 방지하고, 성능을 최적화 합니다.<br><br>

**UI : Shadn UI**

* Shadcn UI는 미리 정의된 컴포넌트를 제공하여, 빠르게 UI를 구축할 수 있습니다.
* 컴포넌트 기반 구조로 인해 코드 재사용이 용이하고, 유지보수가 쉽습니다. 
* 기본 스타일을 쉽게 커스터마이징할 수 있습니다.<br><br>


**드래그앤드롭 : DnD React**

* **react-dnd vs react-beautiful-dnd** 
  * **react-beautiful-dnd**는 설정이 간편하고 자연스러운 애니메이션을 제공하지만 리스트와 같은 단순한 ui에 최적화 되어있습니다. 
  * **react-dnd**는 복잡한 드래그 앤 드롭 시나리오를 지원하며, 디테일한 커스터마이징이 가능합니다.
* Grid CSS 기반 레이아웃의 복잡한 드래그앤 드롭 구현을 위하여 디테일한 커스터마이징이 가능한 **react-dnd**를 사용하였습니다.<br><br>


## 기능 소개
### 1.메인 화면 위젯 설정하기
'설정 → 위젯' 메뉴에서 '위젯 편집하기' 버튼을 클릭하여 위젯 편집 모드로 접근 할 수 있습니다.

**1-1. 위젯 편집하기**

<img src="https://phpgongcvqculnamdqry.supabase.co/storage/v1/object/public/post/b5698087-5e10-4743-9644-dff6a6cc3fac" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

* 위젯 편집 모드에서는 위젯을 드래그하여 위치를 변경하거나 삭제할 수 있습니다.<br><br>


**1-2. 위젯 추가하기**

<img src="https://phpgongcvqculnamdqry.supabase.co/storage/v1/object/public/post/b6d967fe-da69-47b0-9c73-678494ac3cf2" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

*   '위젯 추가' 버튼을 클릭하여 위젯을 추가할 수 있습니다.<br>
*   이미지, 게시판, 프로필 등 다양한 종류와 크기의 위젯을 활용하여 하우스를 꾸밀 수 있습니다.<br><br>

**1-3. 위젯 옵션 설정하기**

<img src="https://phpgongcvqculnamdqry.supabase.co/storage/v1/object/public/post/4e8b138c-5aad-4334-8863-017e95250e9f" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

*   위젯을 클릭하여 세부 옵션을 설정합니다.
*   위젯의 이미지를 등록하거나 게시판, 포스트를 연결 할 수 있습니다.<br><br>


### 2. 룸(게시판) 생성하기

<img src="https://phpgongcvqculnamdqry.supabase.co/storage/v1/object/public/post/a1a49924-4575-4c95-9f33-163e20a72f89" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

*   리스트형, 카드형, html형, 메모형, 링크 형태의 게시판을 추가할 수 있습니다.<br><br>

### 3. 테마 변경하기

<img src="https://phpgongcvqculnamdqry.supabase.co/storage/v1/object/public/post/1d14a6e1-d880-4640-a068-72c5ac2a465b" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

*   로고, 배경, 색상 등 다양한 테마 옵션을 변경할 수 있습니다.<br><br>

### 4. 글 작성

**4-1. 포스트 작성**

* 노션 스타일의 에디터를 사용하여 직관적으로 포스트를 작성할 수 있습니다.
* 공개 권한을 설정하거나 비밀번호를 설정할 수 있습니다.

**4-2. 포스트 작성(html)**
* html을 사용하여 포스트를 작성할 수 있습니다.
* 원활한 포스트 작성을 위하여 즉각적으로 html을 랜더링하여 미리보기 화면을 제공합니다.

**4-3. 메모 작성**

* 간략한 메모형식의 글을 작성할 수 있습니다. 
* 관리자가 아닌 사람도 글을 작성할 수 있으며, 비공개 또는 익명으로 설정이 가능합니다.

