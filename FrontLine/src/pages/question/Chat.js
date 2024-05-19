import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용
import axios from 'axios';

function ChatRooms() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/fetch_chat_history/${chatRoomId}`);
        setChats(response.data);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChats();
  }, [chatRoomId]);

  return (
    <div>
      <h2>Chat Room: {chatRoomId}</h2>
      {chats.map(chat => (
        <div key={chat.id}>
          <p><strong>Question:</strong> {chat.question}</p>
          <p><strong>Answer:</strong> {chat.response}</p>
        </div>
      ))}
    </div>
  );
}

export default function Chat() {
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('http://localhost:8000/createRoom');
      const chatRoomId = response.data.chat_room_id;
      navigate(`/chat/${chatRoomId}`); // useHistory 대신 useNavigate 사용
    } catch (error) {
      console.error('Failed to create room:', error);
      // Handle error appropriately
    }
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>

      
    </div>
  );
}
