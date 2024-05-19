/**
 * 사이트 엔드포인트에 들어갈 기본 라우팅 컴포넌트.
 */

// 경로 자동 라우팅에 관련된 의존성.
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 부분 컴포넌트 의존성.
import { HeaderX } from "./component/Container/XContainer";

// 페이지 의존성.
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import SelectRoom from "./pages/question/SelectRoom";
import Chat from "./pages/question/Chat";
import ChatRoom from "./pages/question/ChatRoom";
import CreateRoom from "./pages/question/CreateRoom"; // import CreateRoom 컴포넌트 추가


export default function App() {
  return (
    <BrowserRouter>
      <HeaderX></HeaderX>
      <div style={{
        position: "absolute",
        marginTop: "60px",
        width: "100%"
      }}>
        <Routes>
          <Route path="/question" Component={ChatRoom}></Route>
          <Route path="/createRoom" element={<CreateRoom />} />
          <Route path="/chat/:chatRoomId" element={<ChatRoom />} />

          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="*" Component={Index} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
