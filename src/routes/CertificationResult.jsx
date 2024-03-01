import React from "react";
import { Icon, Button, Box } from "@chakra-ui/react";
import queryString from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

export default function CertificationResult() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = queryString.parse(search);

  const { merchant_uid, error_msg, imp_uid, success } = query;
  const isSuccessed =
    typeof success === "string" ? success === "true" : success;

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
      color={colorType}
    >
      <Icon
        children={iconType}
        fontSize="10rem"
        textAlign="center"
        marginBottom="2rem"
        color={colorType}
      />
      <p style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        {`본인인증에 ${resultType}하였습니다`}
      </p>
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
      <Button size="lg" onClick={() => navigate("/")}>
        <Icon name="arrow-left" />
        돌아가기
      </Button>
    </Box>
  );
}
