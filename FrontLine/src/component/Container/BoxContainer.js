import React from "react"

/**
 * @description 응답 필드 컴포넌트.
 * @type {(props: {aiName: string, children: string | React.ReactElement}) => React.ReactElement}
 */
function ResponseBox({aiName, children}) {
  // 컴포넌트 처리
  const aiTag = {
    Chat_GPT: {
      img: "https://chat.openai.com/",
      tech: "GPT 3.5"
    },
    Gemini: {
      img: "https://gemini.google.com/",
      tech: "울트라 1.0"
    },
    Copliot: {
      img: "https://copilot.microsoft.com/",
      tech: ""
    }
  }

  // 컴포넌트 반환
  return (
    <fieldset style={{
      minHeight: "720px",
      background: "rgba(150, 150, 150, 0.1)"
    }}>
      <div className="response_title">
        <img src={`https://www.google.com/s2/favicons?domain=${aiTag[aiName].img}`}></img>
        <div>
          <h5 style={{
            fontSize: "16px",
          }}>{aiName}</h5>
          <p style={{
            fontSize: "12px",
            color: "darkgray",
          }}>@{aiTag[aiName].tech}</p>  
        </div>
      </div>
      <pre>{children}</pre>
    </fieldset>
  )
}

/**
 * @description 알림 필드 컴포넌트
 * @type {(props: {img: string, title: string, children: string | React.ReactElement}) => React.ReactElement}
 */
function NoticeBox({img, title, children}) {
  return (
    <div style={{
      display: "flex",
      width: "400px",
      margin: "100px auto",
      padding: "10px",
      color: "black",
      background: "white",
      borderRadius: "20px"
    }}>
      <img style={{
        width: "60px",
        height: "60px",
        margin: "auto 20px"
      }}src={img}></img>
      <div style={{
        textAlign: "center"
      }}>
        <h2 style={{
          marginBottom: "0px"
        }}>{title}</h2>
        <p style={{
          marginTop: "10px"
        }}>{children}</p>
      </div>
    </div>
  )
}

export { ResponseBox, NoticeBox }