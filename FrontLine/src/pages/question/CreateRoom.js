import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        try {
            const tokens = localStorage.getItem('tokens');
            if (!tokens) {
                console.error('No tokens found. Redirecting to login.');
                navigate('/login'); // Redirect to login if no tokens found
                return;
            }

            const parsedTokens = JSON.parse(tokens);
            const accessToken = parsedTokens.access;
            if (!accessToken) {
                console.error('Access token is missing. Redirecting to login.');
                navigate('/login'); // Redirect to login if no access token found
                return;
            }

            const response = await axios.post('http://localhost:8000/createRoom/', {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const { chat_room_id } = response.data;
            navigate(`/chat/${chat_room_id}`);
            console.log("Room created successfully.");
        } catch (error) {
            console.error("Failed to create room:", error);
            // Redirect to login if the token might have expired or is invalid
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/login');
            }
        }
    };

    return (
        <div>
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>
    );
};

export default CreateRoom;
