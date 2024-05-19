import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Management, Protecter } from '../../UtilPack';

const ChatRoom = () => {
    const navigate = useNavigate();
    const { chatRoomId } = useParams();
    const [chatList, setChatList] = useState([]);
    const [gptInputValue, setGptInputValue] = useState("");
    const [geminiInputValue, setGeminiInputValue] = useState("");
    const submitQuestion = async ({question, source}) => {
        await Management.Rooms.submitQuestion({
            question: question,
            source: source
        });
        setChatList(Management.Rooms.datas);
    }
    useEffect(() => {
        const refreshRoom = async () => {
            await Management.Rooms.syncRoomData(chatRoomId);
            setChatList(Management.Rooms.datas);
        }
        refreshRoom();
    }, [chatRoomId])
    return (
        <Protecter>
            <div className="container" style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '20%', padding: '10px', borderRight: '1px solid #ccc'}}>
                    <h3>Chat Rooms</h3>
                    {Management.Rooms.list.map(id => (
                        <div key={id} onClick={() => navigate(`/chat/${id}`)} style={{ cursor: 'pointer', padding: '5px' }}>
                            {id}
                        </div>
                    ))}
                </div>
                <div style={{ width: '80%', padding: '10px' }}>
                    <div>Email: {Management.Auth.email}</div>
                    <div>Name: {Management.Auth.name}</div>
                    <button onClick={() => navigate('/logout')}>Logout</button>
                    <Link to="/createRoom" style={{height: "40px"}}>Create new chat room</Link>
                    <Link to="/" style={{height: "40px"}}>Back to home</Link>
                    <div className="chat-container" style={{ overflowY: 'auto', maxHeight: '600px', backgroundColor: '#000' }}>
                        {chatList.map((chat, index) => (
                            <div key={index} className="message" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <div className="user-message" style={{ backgroundColor: '#007bff', padding: '8px 12px', borderRadius: '4px', maxWidth: '70%', alignSelf: 'flex-end' }}>
                                    {chat.question}
                                </div>
                                <div className="ai-message" style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 12px', borderRadius: '4px', maxWidth: '70%', alignSelf: 'flex-start' }}>
                                    {chat.response}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <input
                            type="text"
                            placeholder="Message to GPT"
                            onInput={e => setGptInputValue(e.target.value)}
                            style={{ width: 'calc(100% - 20px)', padding: '8px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', color: '#000' }}
                            />
                        <button onClick={() => submitQuestion({
                            question: gptInputValue,
                            source: "gpt"
                        })}>Send to GPT</button>
                        <input
                            type="text"
                            placeholder="Message to Gemini"
                            onInput={e => setGeminiInputValue(e.target.value)}
                            style={{ width: 'calc(100% - 20px)', padding: '8px', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', color: '#000' }}
                            />
                        <button onClick={() => submitQuestion({
                            question: geminiInputValue,
                            source: "gemini"
                        })}>Send to Gemini</button>
                    </div>
                </div>
            </div>
        </Protecter>
    );
};

export default ChatRoom;
