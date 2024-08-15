# ⚡️ ZEUSE

취향을 담아 만드는 내 하우스

<img src="https://github.com/wisdom-13/zeuse/assets/77341912/588117a5-0a4c-4072-a0cc-b8b32fe7d7ff" width="650" style="border-radius: 0.5rem; border: 1px solid #eee" />

**서비스 URL** : https://zeuse.vercel.app (id:user@test.com / pw:test1234)<br>
**모델 하우스** : https://zeuse.vercel.app/house<br><br>


## 프로젝트 소개
ZEUSE는 개인 블로그(하우스)를 만들고 관리할 수 있는 서비스입니다.<br>
개발 지식이 없는 사용자도 쉽게 블로그를 꾸밀 수 있도록 다양한 커스텀 기능을 제공합니다.<br>

창작을 하는 친구들에게 개발자로서 **‘개인 홈페이지 하나씩은 만들어주고 싶다!’** 에서 시작된 프로젝트입니다. <br>
간단하게는 블로그 서비스이지만 __자유도 높은 커스텀__ 과 __창작물을 게시하고 공유__ 할 수 있는 서비스를 목표로 하고 있습니다. <br>

실제 사용자인 친구들에게 여러 피드백과 의견을 들으며 프로젝트를 개선해나가고 있으며, <br>
단발성 사이드 프로젝트가 아닌 실제 운영 서비스로 지속적으로 업데이트를 진행할 예정입니다.<br><br>


## 개발 환경
* **개발 인원** : 1인
* **개발 기간** : 2024.03 ~ (진행중) 
  * 1차 배포 : 2024.05.27
* **사용 기술**
  * **코어 스택** : React.js, Next.js, Typescript
  * **상태 관리** : Zustand, React Query
  * **스타일링** : Tailwindcss, shadcn/ui
  * **폼 검증** : react-hook-form, zod
  * **백엔드 서비스** : Supabase
  * **배포** : vercel<br><br>


## 채택한 개발 기술

**상태 관리 : Zustand, TanStack Query**<br>
테마 옵션 변경 등 실시간으로 사용자에게 피드백을 제공하고, 불필요한 props 전달을 줄이기 위해 Zustand를 도입하였으며, <br>
서버와의 비동기 데이터 통신을 최적화하기 위해 TanStack Query를 사용하여 데이터 캐싱, 동기화, 리트라이 메커니즘을 효과적으로 구현하였습니다.<br><br>

**UI : Shadn UI**<br>
미리 정의된 컴포넌트를 제공하여, 빠르게 UI를 구축할 수 있는 Shadcn UI를 사용하였습니다. <br>
컴포넌트 기반 구조로 인해 코드 재사용이 용이하고, 유지 보수가 쉬우면서 기본 스타일을 쉽게 커스터마이징할 수 있었습니다.<br><br>

**드래그앤드롭 : React DnD**<br>
Grid CSS 기반 레이아웃의 복잡한 드래그 앤 드롭 구현을 위하여 react-beautiful-dnd에 비해 디테일한 커스터마이징이 가능한 **react-dnd**를 사용하였습니다.<br><br>



## 기능 소개
### 1.메인 화면 위젯 설정하기

**드래그 앤 드롭 인터페이스** : Drag-and-Drop 라이브러리를 사용하여 사용자가 위젯을 간편하게 배치할 수 있도록 드래그 앤 드롭 기능을 구현했습니다.<br><br>

'설정 → 위젯' 메뉴에서 '위젯 편집하기' 버튼을 클릭하여 위젯 편집 모드로 접근 할 수 있습니다.<br>

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

* **검색 디바운싱** : 사용자가 검색 기능을 사용할 때, 디바운싱 처리를 적용하여 불필요한 API 호출을 줄였습니다.<br>
* **포스트 작성** : 텍스트를 쉽게 편집하고 포맷팅할 수 있도록 blocknote를 활용한 에디터를 구현했으며, <br>게시판 종류에 따라 포스트를 HTML 형식으로 렌더링할 수 있는 기능을 추가하여, 사용자가 다양한 콘텐츠를 더욱 자유롭게 표현할 수 있도록 했습니다.

<br><br>

## 프로젝트 돌아보기
### 느끼고 배운 점
*  **개발의 즐거움**: 내가 만들고 싶은 서비스를 직접 개발하면서 큰 재미를 느꼈습니다. 사용자에게 가치를 제공할 수 있는 기능을 구현하는 과정이 매우 보람찼습니다.
*  **코드 품질의 중요성**: 프로젝트 규모가 커지고 기능이 추가될수록 코드 품질의 중요성을 절감했습니다. 초기 코드가 정돈되지 않았던 탓에, 관심사 분리와 커스텀 훅을 통해 코드를 리팩토링하는 경험을 했습니다. 이를 통해 가독성과 유지보수성을 높이는 좋은 코드를 작성하는 것이 얼마나 중요한지 깨달았습니다.
*  **상태 관리와 성능 최적화**: 프로젝트를 진행하면서 상태 관리와 성능 최적화가 왜 중요한지 직접 체감했습니다. React Query와 Zustand를 활용해 효율적으로 상태를 관리하고 성능을 최적화하는 방법을 배웠으며, 이는 애플리케이션의 안정성과 사용자 경험을 크게 개선하는 데 도움이 되었습니다.

### 아쉬운 점
*  **요구사항 정의의 부족**: 프로젝트를 시작할 때 구현하고 싶은 기능이 많았지만, 요구사항 정의를 제대로 정리하지 못한 채 시작했습니다. 이로인해 중간에 요구사항이 자주 변경되었고, 그때마다 코드와 기능을 수정해야 했습니다. 향후에는 프로젝트 시작 전에 요구사항을 명확히 정의하고, 이를 기반으로 계획을 세우는 것이 중요하다는 점을 배웠습니다.

