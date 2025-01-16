<h2>2024-12-21 ~ 2024-12-25</h2>
<p>JavaScript ➜ TypeScript</p>
<p>회원가입 및 로그인 페이지 타입 적용완료.</p>
<p>대상 페이지 신규 api서버로 코드 수정 완료</p>

![image](https://github.com/user-attachments/assets/76ad10a4-9cdd-4a01-8080-f6cfea168ae1)

<h2>2024-12-26~2024-01-03</h2>
<p>- Javascript ➜ TypeScript</p>
<p>- JWT 인증방식 구현 (Refresh Token 적용방식)</p>
<p>- apiInterceptor 구현</p>
<p>- 로그인 이후, 페이지 랜더링 시 토큰 유효성 체크 구현(PrivateRoute 컴포넌트)</p>
<p>- 중앙집중 관리를 위해 api call 구현 부 수정 (AS-IS) apiAuth.js ➔ (TO-BE) authStore.ts</p>

![Untitled diagram-2025-01-03-140928](https://github.com/user-attachments/assets/e146c126-9f63-4dee-8da9-0d5a9efa81b3)



<h2>2024-01-03 ~ 2024-01-17</h2>
<p>(AS-IS) apiUserData.js ➔ (TO-BE) UserMain/store.js </p>
<p>(AS-IS) 서버요청으로 IMG 파일 fetch ➔ (TO-BE) Pre-signed URL 방식으로 변경  (서버부하 ↓)</p>
<ul>
  <li>UserHeader.js 컴포넌트 UseEffect 로직 추가(50분 주기로 Pre-signed URL URL 갱신)</li>
  <li>대상 컴포넌트 마운트시 ID 유효성체크 후, URL 정보 가져옴</li>
</ul>

![image](https://github.com/user-attachments/assets/e7e27505-a252-4f18-927b-81e24f225dfe)
