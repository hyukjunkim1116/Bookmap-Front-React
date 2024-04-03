import {
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FaBellSlash, FaBell } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useNotificationWebSocket,
  putReadNotification,
  getNotifications,
} from "../services";
import { useAuthStore } from "../stores/auth";

export default function Notification() {
  const toast = useToast();
  const { getUid } = useAuthStore();
  const uid = getUid();
  const { newMessage, setNewMessage } = useNotificationWebSocket(uid);
  const mutation = useMutation({
    mutationFn: putReadNotification,
    onSuccess: async () => {
      const data = await getNotifications();
      setNewMessage([]);
      setNewMessage(Array.isArray(data) ? data : []);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  const [allRead, setAllRead] = useState();
  const handleRead = async (notId) => {
    mutation.mutate(notId);
  };

  useEffect(() => {
    setAllRead(newMessage.every((item) => item.is_read === true));
  }, [newMessage]);
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={allRead ? <FaBellSlash /> : <FaBell />}
        size={"md"}
      ></MenuButton>
      <MenuList>
        {newMessage.map((notification) => (
          <MenuItem
            opacity={notification.is_read ? 0.5 : 1}
            key={notification.id}
            onClick={() => handleRead(notification.id)}
          >
            <Text>{notification.message}</Text>
            <Text>
              {new Date(notification.created_at).toLocaleTimeString()}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
