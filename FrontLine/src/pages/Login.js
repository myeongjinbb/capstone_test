  // 페이지 이동 처리를 의한 위존성.

  // 부분 컴포넌트 의존성.
  import LoginForm from "../component/form/LoginForm";
  import { SpliterX } from "../component/Container/XContainer";

  /**
   * @description 로그인 페이지.
   * @type {() => React.ReactElement}
   */
  export default function Login() {
    // 컴포넌트 반환
    return (
      <SpliterX length="2">
        <LoginForm></LoginForm>
        <img src="img/dog.png"></img>
      </SpliterX>
    )
  }