/**
 * @description 페이지 데코레이션 컴포넌트.
 * @type {() => React.ReactElement}
 */
export default function PageDecoration() {
  // 컴포넌트 반환
  return (
    <>
      <div style ={{
        position: "absolute",
        minWidth: "200px",
        width: "20%",
        height: "20%",
        top: "-80px",
        left: "0px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "50%",
        transform: "rotate(-8deg)"
      }}></div>
      <div style ={{
        position: "absolute",
        width: "120px",
        height: "120px",
        top: "-60px",
        left: "calc(50% - 60px)",
        background: "rgba(255, 255, 255, 0.3)",
        borderRadius: "100px"
      }}></div>
      <div style={{
        position: "absolute",
        width: "280px",
        height: "280px",
        top: "-80px",
        right: "-80px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "50%",
      }}></div>
    </>
  )
}