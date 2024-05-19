

// 부분 컴포넌트 의존성.
import RegisterForm from "../component/form/RegisterForm";
import { SpliterX } from "../component/Container/XContainer";

/**
 * @description 회원가입 페이지.
 * @type {() => React.ReactElement}
 */
export default function Register() {
  // 컴포넌트 반환
  return (
    <SpliterX length="1">
      <RegisterForm></RegisterForm>
    </SpliterX>
  )
}