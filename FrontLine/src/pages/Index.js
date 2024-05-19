// 부분 컴포넌트 의존성.
import { useNavigate } from "react-router-dom";
import { ButtonX, SpliterX } from "../component/Container/XContainer";
import { ChatGPTExample, CopliotExample, GeminiExample } from "../component/Container/ExampleContainer";

function Introduction() {
  // 컴포넌트 처리
  const navigate = useNavigate();
  
  // 컴포넌트 반환
  return (
    <>
      <h1>ACE를 소개합니다.</h1>
      <input type="button" onClick={() => AuthManagement.logout()}></input>
      <SpliterX length="1">
        <img src="img/dog_index.png"></img>
        <div>
          <h2>ACE는 명령을 받은 강아지처럼 다양한곳에서 답변을 물어옵니다.</h2>
          <div style={{
            display: "flex",
            justifyContent: "space-around"
          }}>
            <ButtonX text="시작하기" color={["cornsilk", "dodgerblue"]} autoScale={false} onClick={() => navigate("/login")}></ButtonX>
            <ButtonX text="사용방법" color={["black", "white"]} autoScale={false}></ButtonX>
          </div>
        </div>
      </SpliterX>
    </>
  )
}

/**
 * @description 초기 화면 페이지 몸체 컴포넌트 2.
 * @type {() => React.ReactElement}
 */
function Example() {
  return (
    <>
      <h1>무엇이든 질문해주세요.</h1>
      <p style={{
        textAlign: "center",
        fontSize: "smaller",
        color: "darkgray"
      }}>GPT, gemini등 다양한 대화형 AI에게 물어볼게요.</p>
      <SpliterX length="3">
        <ChatGPTExample></ChatGPTExample>
        <GeminiExample></GeminiExample>
        <CopliotExample></CopliotExample>
      </SpliterX>
    </>
  )
}

/**
 * @description 초기 화면 페이지.
 * @type {() => React.ReactElement}
 */
export default function Index() {
  return (
    <>
      <Introduction></Introduction>
      <Example></Example>
    </>
  )
}