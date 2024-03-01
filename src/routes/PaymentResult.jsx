import React from "react";
import { Icon, Button, Box } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function PaymentResult() {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const { merchant_uid, error_msg, imp_uid } = query;
  const isSuccessed = getIsSuccessed();
  function getIsSuccessed() {
    const { success, imp_success } = query;
    if (typeof imp_success === "string") return imp_success === "true";
    if (typeof imp_success === "boolean") return imp_success === true;
    if (typeof success === "string") return success === "true";
    if (typeof success === "boolean") return success === true;
  }

  const iconType = isSuccessed ? <CheckCircleIcon /> : <WarningIcon />;
  const resultType = isSuccessed ? "성공" : "실패";
  const colorType = isSuccessed ? "#52c41a" : "#f5222d";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor="#fff"
      borderRadius="4px"
      padding="2rem"
    >
      <Icon
        children={iconType}
        fontSize="10rem"
        textAlign="center"
        marginBottom="2rem"
        color={colorType}
      />
      <p
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
      >{`결제에 ${resultType}하였습니다`}</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "3rem" }}>
        <li style={{ display: "flex", lineHeight: 2 }}>
          <span style={{ width: "8rem", color: "#888" }}>주문번호</span>
          <span style={{ width: "calc(100% - 8rem)", color: "#333" }}>
            {merchant_uid}
          </span>
        </li>
        {isSuccessed ? (
          <li style={{ display: "flex", lineHeight: 2 }}>
            <span style={{ width: "8rem", color: "#888" }}>아임포트 번호</span>
            <span style={{ width: "calc(100% - 8rem)", color: "#333" }}>
              {imp_uid}
            </span>
          </li>
        ) : (
          <li style={{ display: "flex", lineHeight: 2 }}>
            <span style={{ width: "8rem", color: "#888" }}>에러 메시지</span>
            <span style={{ width: "calc(100% - 8rem)", color: "#333" }}>
              {error_msg}
            </span>
          </li>
        )}
      </ul>
      <Button
        size="lg"
        borderColor={colorType}
        color={colorType}
        _hover={{ opacity: 0.7 }}
        onClick={() => window.history.back()}
      >
        <Icon type="arrow-left" />
        돌아가기
      </Button>
    </Box>
  );
}
