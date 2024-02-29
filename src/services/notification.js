import useWebSocket from "react-use-websocket";
import { useState } from "react";
import jwtInstance from "../utils/jsonInterceptor";

//완료
export const getNotifications = async () => {
  return await jwtInstance
    .get("notification/")
    .then((response) => response.data);
};
//완료
export const putReadNotification = async (notId) => {
  return await jwtInstance.patch(`notification/${notId}`);
};
//완료
export const useNotificationWebSocket = (uid) => {
  const [newMessage, setNewMessage] = useState([]);
  const [message, setMessage] = useState("");
  const socketUrl = `ws://127.0.0.1:8000/notification?uid=${uid}`;
  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const maxConnectionAttempts = 4;

  const { _ } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await getNotifications();
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
      const newMessage = JSON.parse(msg.data);
      console.log(newMessage.data, "msgasdas");
      setNewMessage((prev_msg) => [newMessage.data, ...prev_msg]);
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
    setNewMessage,
  };
};
