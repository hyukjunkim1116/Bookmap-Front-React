// import { useWebSocket } from '@vueuse/core';
// import { ref, computed } from 'vue';
// import { useAsyncState } from '@vueuse/core';
// import { jwtApi } from 'src/boot/axios-config';
// import { useAuthStore } from 'src/stores/auth';

// export const useNotification = () => {
//   const authStore = useAuthStore();
//   const messages = ref([]);
//   const uid = computed(() => {
//     return authStore.loginUser?.uid || null;
//   });

//   if (uid.value) {
//     const { execute } = useAsyncState(getNotifications, [], {
//       immediate: false,
//       throwError: true,
//       onSuccess: response => {},
//       onError: err => {},
//     });
//     const { close, open, error, status } = useWebSocket(
//       `ws://127.0.0.1:8000/notification?uid=${uid.value}`,
//       {
//         onConnected: async ws => {
//           try {
//             const notifications = await execute();
//             messages.value = notifications.data;
//           } catch (error) {
//             console.error(error);
//           }
//         },
//         onDisconnected: (ws, event) => {
//           if (event.code == 4001) {
//             console.log('Authentication Error');
//           }
//         },
//         onMessage: (ws, msg) => {
//           const newData = JSON.parse(msg.data);
//           messages.value = [newData.data, ...messages.value];
//         },
//         onError: (ws, msg) => {},
//       },
//     );
//     return {
//       status,
//       messages,
//       open,
//       close,
//       error,
//     };
//   }
// };
import useWebSocket from "react-use-websocket";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosUtils";
const getNotifications = async () => {
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
  return await axiosInstance.get("notification/");
};

export const putReadNotification = async (notId) => {
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
  return await axiosInstance.patch(`notification/${notId}`);
};
export const useNotificationWebSocket = (uid) => {
  const [newMessage, setNewMessage] = useState([]);
  const [message, setMessage] = useState("");
  const { fetchData } = getNotifications();
  const socketUrl = `ws://127.0.0.1:8000/notification?uid=${uid}`;
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
export default useNotificationWebSocket;
