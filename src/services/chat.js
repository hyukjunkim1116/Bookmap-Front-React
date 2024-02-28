import useWebSocket from "react-use-websocket";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosUtils";

const getChats = async () => {
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.get("webchat/");
};

const useChatWebSocket = (uid) => {
  const [newMessage, setNewMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { fetchData } = getChats();
  const socketUrl = `ws://127.0.0.1:8000/webchat?uid=${uid}`;
  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const maxConnectionAttempts = 4;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
        console.log("Connected!!!");
      } catch (error) {
        console.log(error);
      }
    },
    onClose: (event) => {
      if (event.code == 4001) {
        console.log("Authentication Error");
      }
      console.log("Close");
      setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
      setMessage("");
    },
    shouldReconnect: (closeEvent) => {
      if (
        closeEvent.code === 4001 &&
        reconnectionAttempt >= maxConnectionAttempts
      ) {
        setReconnectionAttempt(0);
        return false;
      }
      return true;
    },
    reconnectInterval: 1000,
  });

  return {
    newMessage,
    message,
    setMessage,
    sendJsonMessage,
  };
};
export default useChatWebSocket;
