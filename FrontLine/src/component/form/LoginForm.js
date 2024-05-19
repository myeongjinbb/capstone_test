// 필요한 모듈 및 컴포넌트 import
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ButtonX, InputX } from "../Container/XContainer";
import { Management } from "../../UtilPack";
import { useState } from "react";

// 로그인 폼의 헤더 컴포넌트
function LoginFormHeader() {
  return (
    <>
      <legend style={{
        top: "40px",
        width: "100%",
        color: "slateblue",
        textAlign: "center",
        fontSize: "xxx-large",
        fontWeight: "600"
      }}>WELCOME BACK</legend>
      <p style={{
        display: "inline-block",
        width: "100%",
        color: "rgba(150, 150, 150, 0.5)",
        textAlign: "center",
        fontSize: "18px",
      }}>ACE에 오신걸 환영합니다.</p>
    </>
  )
}

// 로그인 폼의 바디 컴포넌트
function LoginFormBody() {
  return (
    <>
      <InputX name="email" placeholder="Enter your email" type="email"></InputX>
      <InputX name="password" placeholder="Enter your password" type="password"></InputX>
      <Link style={{
        fontSize: "14px",
        flexDirection: "row-reverse",
        top: "-20px",
        color: "rgba(255, 255, 255, 0.6)"
      }} to="/forgot">Forgot Password?</Link>
      <ButtonX text="로그인" canSubmit={true}></ButtonX>
    </>
  )
}

// 로그인 폼의 푸터 컴포넌트
function LoginFormFooter() {
  return (
    <span style={{
      display: "block",
      width: "100%",
      textAlign: "center",
      marginTop: "10px"
    }}>처음이신가요? <Link to="/register">회원가입</Link>하기</span>
  )
}

// 로그인 폼 메인 컴포넌트
export default function LoginForm() {
  const [toggle, setToggle] = useState(false);

  const submit = async e => {
    e.preventDefault();
    await Management.Auth.login(e.target[1].value, e.target[2].value);
    setToggle(!toggle);
  }

  return Management.Auth.isLogined ? <Navigate to="/"></Navigate> : (
    <form onSubmit={submit}>
      <fieldset>
        <LoginFormHeader />
        <LoginFormBody />
        <LoginFormFooter />
      </fieldset>
    </form>
  )
}
