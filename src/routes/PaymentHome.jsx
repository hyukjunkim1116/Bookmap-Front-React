import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdCreditCard, MdPerson } from "react-icons/md"; // 아이콘 import

export default function PaymentHome() {
  const navigate = useNavigate();

  return (
    <Box alignItems="center" justifyContent="center" flexDirection="column">
      <Flex
        background="#344e81"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        color="white"
        p={4}
      >
        <h2>아임포트 테스트</h2>
        <h4>아임포트 리액트 테스트 화면입니다.</h4>
        <h4>아래 버튼을 눌러 결제 또는 본인인증 테스트를 진행해주세요.</h4>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt={10}>
        <Button
          onClick={() => navigate("/payment/pay")}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="10rem"
          width="15rem"
          m="0 0.5rem"
          boxShadow="0 0 1rem 0 rgba(0, 0, 0, 0.13)"
        >
          <MdCreditCard size="2rem" mb="0.5rem" />
          결제 테스트
        </Button>
        <Button
          onClick={() => navigate("/payment/certification")}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="10rem"
          width="15rem"
          m="0 0.5rem"
          boxShadow="0 0 1rem 0 rgba(0, 0, 0, 0.13)"
        >
          <MdPerson size="2rem" mb="0.5rem" />
          본인인증 테스트
        </Button>
      </Flex>
    </Box>
  );
}
