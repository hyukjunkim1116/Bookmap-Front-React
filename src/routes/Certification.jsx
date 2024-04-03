import {
  FormLabel,
  Input,
  Button,
  Box,
  FormControl,
  VStack,
  Heading,
} from "@chakra-ui/react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Certification() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    const userCode = "imp10391932";
    const { merchant_uid, name, phone, min_age } = values;

    const data = { merchant_uid };
    if (name) data.name = name;
    if (phone) data.phone = phone;
    if (min_age) data.min_age = min_age;
    const { IMP } = window;
    
    IMP.init(userCode);
    IMP.certification(data, callback);
  };
  const callback = (response) => {
    const query = queryString.stringify(response);
    navigate(`/payment/certification/result?${query}`);
  };

  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Heading textAlign={"center"}>아임포트 본인인증 테스트</Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={10} mt={5}>
        <FormControl>
          <FormLabel htmlFor="merchant_uid">주문번호</FormLabel>
          <Input
            id="merchant_uid"
            size="lg"
            name="merchant_uid"
            defaultValue={`min_${new Date().getTime()}`}
            {...register("merchant_uid", {
              required: "주문번호는 필수입력입니다",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">이름</FormLabel>
          <Input id="name" size="lg" name="name" {...register("name")} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phone">전화번호</FormLabel>
          <Input
            id="phone"
            size="lg"
            type="number"
            name="phone"
            {...register("phone")}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="min_age">최소연령</FormLabel>
          <Input
            id="min_age"
            size="lg"
            type="number"
            placeholder="허용 최소 만 나이"
            name="min_age"
            {...register("min_age")}
          />
        </FormControl>
        <Button type="submit" size="lg" marginTop="2rem">
          본인인증하기
        </Button>
      </VStack>
    </Box>
  );
}
