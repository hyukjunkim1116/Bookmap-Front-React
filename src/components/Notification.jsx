import { VStack, Box, Text, Badge, IconButton } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
export default function Notification() {
  const toggleNotification = () => {};
  return (
    <IconButton onClick={toggleNotification} icon={<FaBell />} size={"lg"}>
      <VStack spacing={4} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            Notifications
          </Text>

          <VStack align="stretch" spacing={2}>
            <Box p={2} borderWidth="1px" borderRadius="md">
              <Text>Notification content</Text>
            </Box>

            <Box p={2} borderWidth="1px" borderRadius="md">
              <Text>Another notification</Text>
            </Box>
          </VStack>

          <Box mt={2}>
            <Badge colorScheme="red">3</Badge> unread notifications
          </Box>
        </Box>
      </VStack>
    </IconButton>
  );
}
