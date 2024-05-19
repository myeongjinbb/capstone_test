// 서버 연결을 위한 의존성
import axios from "axios";
import { Navigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
});
const Management = class {
    static #islogined = false;
    static #name = null;
    static #email = null;
    static #rooms = [];

    static Auth = class Auth {
        static get isLogined() {
            return Management.#islogined;
        }
        static get name() {
            return Management.#name;
        }
        static get email() {
            return Management.#email;
        }
        static login = async (email, password) => {
            try {
                const response = await axiosInstance.post('/login/', { email, password });
                localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
                await Management.init();
            } catch (e) {
                if (e.response.status == 400) console.log(e.response.data.error)
            }
        }
        static regist = async (name, email, password, verify) => {
            try {
                const response = await axiosInstance.post('/register/', { name, email, password, verify });
                localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
                await Management.init();
            } catch (e) {
                if (e.response.status == 400) console.log(e.response.data.error)
            }
        }
    }
    static Rooms = class Rooms {
        static #roomId = null;
        static #datas = [];
        static get list() {
            return JSON.parse(JSON.stringify(Management.#rooms));
        }
        static get datas() {
            return JSON.parse(JSON.stringify(this.#datas));
        }

        static syncRoomData = async roomId => {
            if (!roomId) return;
            try {
                const response = await axiosInstance.get(`/fetch_chat_history/${roomId}`);
                this.#roomId = roomId
                this.#datas = response.data.map(element => ({
                    question: element.question,
                    response: element.response,
                    source: element.source
                }))
            } catch (e) {
                console.log(e);
            }
        }

        static createRoom = () => {
            
        }
        static submitQuestion = async ({question, source}) => {
            const response = await axiosInstance.post(`/chat/${this.#roomId}/`, { question, source })
            this.#datas.push({
                question: response.data.question,
                response: response.data.response,
                source: source
            })
        }
    }
    static init = async () => {
        const token = JSON.parse(localStorage.getItem("tokens"))
        if (token) {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token.access}`;
            const [auth, rooms] = await Promise.all([
                axiosInstance.get('/get_user_info/'),
                axiosInstance.get('/list_chat_rooms/')
            ]).catch(e => {
                console.log(e);
                localStorage.removeItem("tokens");
                window.location.reload();
            });
            this.#islogined = true;
            this.#name = auth.data.name;
            this.#email = auth.data.email;
            this.#rooms = rooms.data.map(obj => obj.chat_room_id);
        }
    }
}
const Protecter = ({children}) => Management.Auth.isLogined ? <div>{children}</div> : <Navigate to="/login"></Navigate>;

export { Management, Protecter }