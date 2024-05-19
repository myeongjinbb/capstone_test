import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ChatRoom = ({ chatRoomId }) => {
    const [user, setUser] = useState(null);
    const [gptChats, setGptChats] = useState([]);
    const [geminiChats, setGeminiChats] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [source, setSource] = useState('gpt'); // Assuming default source as 'gpt'
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserAndChats();
    }, [chatRoomId]);

    const fetchUserAndChats = async () => {
        try {
            const tokens = localStorage.getItem('tokens');
            if (!tokens) {
                console.error('Token object is missing in localStorage');
                navigate('/login');  // Redirect to login if no token found
                return;
            }

            const parsedTokens = JSON.parse(tokens);
            const accessToken = parsedTokens.access;
            if (!accessToken) {
                console.error('Access token is missing in localStorage');
                navigate('/login');  // Redirect to login if no access token found
                return;
            }

            const userResponse = await axios.get('http://localhost:8000/get_user_info/', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setUser(userResponse.data);

            // Fetch chats similarly if needed
            // Example: const chatsResponse = ...
            // setGptChats(chatsResponse.data.gptChats);
            // setGeminiChats(chatsResponse.data.geminiChats);
        } catch (error) {
            console.error("Error fetching user data:", error);
            navigate('/login');  // Redirect or handle errors appropriately
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const tokens = localStorage.getItem('tokens');
        const parsedTokens = JSON.parse(tokens);
        const accessToken = parsedTokens.access;

        try {
            await axios.post(`/chat/${chatRoomId}`, {
                question: inputValue,
                source
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setInputValue(''); // Clear input after sending
            fetchUserAndChats();  // Refresh chat after sending
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="container">
            <h1>Ask anything</h1>
            {user && (
                <>
                    <div>Email: {user.email}</div>
                    <div>Name: {user.name}</div>

                    <button onClick={() => navigate('/logout')}>Logout</button>
                </>
            )}
            
            <Link to="/createRoom">Create new chat room</Link>
            <Link to="/">Back to home</Link>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '60px', backgroundColor: '#FAFAFA' }}>
                <ChatList chats={gptChats} source="gpt" onSubmit={handleSend} onChange={(e) => setInputValue(e.target.value)} inputValue={inputValue} />
                <ChatList chats={geminiChats} source="gemini" onSubmit={handleSend} onChange={(e) => setInputValue(e.target.value)} inputValue={inputValue} />
            </div>
        </div>
    );
};

const ChatList = ({ chats, source, onSubmit, onChange, inputValue }) => (
    <div style={{ width: '500px' }}>
        <div className="chat">
            {chats.map(chat => (
                <div key={chat.id} className="message">
                    <div className="user-message">{chat.question}</div>
                    <div className="ai-message">{chat.response}</div>
                </div>
            ))}
        </div>
        <form onSubmit={onSubmit}>
            <input type="hidden" value={source} />
            <input type="text" value={inputValue} onChange={onChange} />
            <button type="submit">Send to {source}</button>
        </form>
    </div>
);

export default ChatRoom;
