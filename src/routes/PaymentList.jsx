/* eslint-disable no-unused-vars */
import { Box, Text, VStack, Heading, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ProtectedPage from "../components/ProtectedPage";
import { getPaymentsHistory } from "../services";
export default function PaymentList() {
  const { isLoading, data: paymentData } = useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentsHistory,
    refetchOnWindowFocus: false,
  });
  console.log(paymentData);
  return (
    <ProtectedPage>
      <Heading textAlign={"center"} mt={6}>
        나의 결제 내역
      </Heading>
      {paymentData?.data.map((res) => (
        <Box
          key={res.id}
          maxW="600px"
          mx="auto"
          mt="50px"
          p="20px"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <VStack
            spacing="20px"
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
            mt={4}
          >
            <Text>
              구매일시 :{" "}
              {new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(new Date(res.created_at))}
            </Text>
            <Text>구매상품 : {res.merchant}</Text>
            <Text>Imp : {res.imp}</Text>
            <Text>가격 : {res.amount}</Text>
          </VStack>
        </Box>
      ))}
    </ProtectedPage>
  );
}
