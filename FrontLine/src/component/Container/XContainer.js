// 페이지 이동 처리를 의한 위존성.
import { Link, Navigate, useLocation } from "react-router-dom"

/**
 * @description 헤더 컴포넌트.
 * @type {() => React.ReactElement}
 */
function HeaderX() {
  // 컴포넌트 처리
  const pageMap = [
    {
      title: "질문하기",
      href: "/question"
    },
    {
      title: "통계보기",
      href: "/summary"
    },
    {
      title: "AI종류보기",
      href: "/ailist"
    }
  ];
  const location = useLocation();

  // 컴포넌트 반환
  return (
    <header>
      <Link style={{
        fontWeight: "bold"
      }} to="/">ACE</Link>
      <div>
        {pageMap.map((pageinfo) => <Link key={pageinfo.href} style={pageinfo.href == location.pathname ? {color: "cyan"} : null} to={pageinfo.href}>{pageinfo.title}</Link>)}
      </div>
    </header>
  )
}

/**
 * @description 입력 컴포넌트.
 * @type {(props: {name: string, placeholder: string}) => React.ReactElement}
 */
function InputX({name, placeholder}) {
  // 컴포넌트 반환
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      margin: "25px 0px",
      color: "rgba(255, 255, 255, 0.9)"
    }}>
      <label style={{
        fontSize: "14px",
        marginBottom: "4px",
        color: "rgba(255, 255, 255, 0.8)"
      }}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input style={{
        border: "1px solid rgba(255, 255, 255, 0.3)",
        background: "none"
      }} required={true} name={name.split(" ")[0]} type={name.includes("password") ? "password" : "text"} placeholder={placeholder}></input>
    </div>
  )
}

/**
 * @description 버튼 관련 컴포넌트.
 * @type {(props: {text: string, color?: String[], autoScale?: Boolean, canSubmit?: Boolean, onClick?: Function}) => React.ReactElement}
 */
function ButtonX({text, color=["white", "mediumpurple"], autoScale=true, canSubmit=false, onClick}) {
  // 컴포넌트 반환
  return (
    <input style={{
      width: autoScale? "100%" : null,
      height: "40px",
      margin: "10px 0",
      color: color[0],
      background: color[1],
    }} type={canSubmit? "submit" : "button"} value={text} onClick={onClick}></input>
  )
}

/**
 * @description 보안 점검 컴포넌트.
 * @type {(props: {query: Function, rejectedRedirect: string, children: string | React.ReactElement}) => React.ReactElement}
 */
function ProtecterX({query, rejectedRedirect, children}) {
  return query() ? children : <Navigate to={rejectedRedirect}></Navigate>;
}

/**
 * @description 분할 필드 컴포넌트.
 * @type {(props: {length: Number, children: string | React.ReactElement}) => React.ReactElement}
 */
function SpliterX({length, children}) {
  // 컴포넌트 처리
  children = 1 < length ? children.map((obj, i) => <div key={i}>{obj}</div>) : <div>{children}</div>

  // 컴포넌트 반환
  return <div className="split_box">{children}</div>
}

export { HeaderX, InputX, ButtonX, ProtecterX, SpliterX }