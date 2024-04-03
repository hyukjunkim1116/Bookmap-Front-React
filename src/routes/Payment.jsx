import React, { useState } from "react";
import {
  FormLabel,
  Select,
  Input,
  Switch,
  Button,
  Flex,
  Box,
  VStack,
  Heading,
  FormControl,
} from "@chakra-ui/react";
import {
  PGS,
  METHODS_FOR_INICIS,
  QUOTAS_FOR_INICIS_AND_KCP,
} from "../utils/payments/constants";
import { getMethods, getQuotas } from "../utils/payments/utils";
import queryString from "query-string";
import { MdCreditCard, MdPerson } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { payToPortOne } from "../services";

import { useAuthStore } from "../stores/auth";
export default function Payment() {
  const [methods, setMethods] = useState(METHODS_FOR_INICIS);
  const [quotas, setQuotas] = useState(QUOTAS_FOR_INICIS_AND_KCP);
  const [isQuotaRequired, setIsQuotaRequired] = useState(true);
  const [isDigitalRequired, setIsDigitalRequired] = useState(false);
  const [isVbankDueRequired, setIsVbankDueRequired] = useState(false);
  const [isBizNumRequired, setIsBizNumRequired] = useState(false);
  const { getUid } = useAuthStore();
  const mutation = useMutation({
    mutationFn: payToPortOne,
    onSuccess: (response) => {
    
    },
    
  });
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onSubmit = (data) => {
    const userCode = "imp19424728";

    const {
      pg,
      pay_method,
      merchant_uid,
      name,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
      escrow,
      card_quota,
      biz_num,
      vbank_due,
      digital,
    } = data;

    const paymentData = {
      pg,
      pay_method,
      merchant_uid,
      name,
      amount,
      buyer_name,
      buyer_tel,
      buyer_email,
      escrow,
    };

    if (pay_method === "vbank") {
      paymentData.vbank_due = vbank_due;
      if (pg === "danal_tpay") {
        paymentData.biz_num = biz_num;
      }
    }
    if (pay_method === "card") {
      if (card_quota !== 0) {
        paymentData.digital = {
          card_quota: card_quota === 1 ? [] : card_quota,
        };
      }
    }
    if (pay_method === "phone") {
      paymentData.digital = digital;
    }
    const { IMP } = window;
    IMP.init(userCode);
    IMP.request_pay(data, callback);
  };
  const callback = (response) => {
    if (response.success) {
      const data = {
        buyer: getUid(),
        amount: response.paid_amount,
        imp: response.imp_uid,
        merchant: response.merchant_uid,
      };
      mutation.mutate(data);
    }
  
    const query = queryString.stringify(response);
    navigate(`/payment/pay/result?${query}`);
  };
  const onChangePg = (value) => {
    const methods = getMethods(value);
    setMethods(methods);
    setValue("pay_method", methods[0].value);

    const payMethod = getValues("pay_method");
    handleQuotas(value, payMethod);

    let isBizNumRequired = false;
    let isVbankDueRequired = false;
    if (payMethod === "vbank") {
      if (value === "danal_tpay") {
        isBizNumRequired = true;
      }
      isVbankDueRequired = true;
    }
    setIsBizNumRequired(isBizNumRequired);
    setIsVbankDueRequired(isVbankDueRequired);
  };

  const onChangePayMethod = (value) => {
    const pg = getValues("pg");
    let isQuotaRequired = false;
    let isDigitalRequired = false;
    let isVbankDueRequired = false;
    let isBizNumRequired = false;
    switch (value) {
      case "card":
        isQuotaRequired = true;
        break;
      case "phone":
        isDigitalRequired = true;
        break;
      case "vbank":
        if (pg === "danal_tpay") {
          isBizNumRequired = true;
        }
        isVbankDueRequired = true;
        break;
      default:
        break;
    }
    setIsQuotaRequired(isQuotaRequired);
    setIsDigitalRequired(isDigitalRequired);
    setIsVbankDueRequired(isVbankDueRequired);
    setIsBizNumRequired(isBizNumRequired);

    handleQuotas(pg, value);
  };

  const handleQuotas = (pg, payMethod) => {
    const { isQuotaRequired, quotas } = getQuotas(pg, payMethod);
    setIsQuotaRequired(isQuotaRequired);
    setQuotas(quotas);
    setValue("card_quota", quotas[0].value);
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
      <Heading textAlign={"center"}>아임포트 결제 테스트</Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={10} mt={5}>
        <FormControl>
          <FormLabel>PG사</FormLabel>
          <Select
            id="pg"
            size="lg"
            onChange={(e) => onChangePg(e.target.value)}
            suffix={<MdCreditCard />}
            {...register("pg")}
          >
            {PGS.map((pg) => (
              <option key={pg.value} value={pg.value}>
                {pg.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>결제수단</FormLabel>
          <Select
            id="pay_method"
            size="lg"
            onChange={(e) => onChangePayMethod(e.target.value)}
            suffix={<MdPerson />}
            {...register("pay_method")}
          >
            {methods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </Select>
        </FormControl>
        {isQuotaRequired && (
          <FormControl direction="column">
            <FormLabel>할부개월수</FormLabel>
            <Select id="card_quota" size="lg" {...register("card_quota")}>
              {quotas.map((quota) => (
                <option key={quota.value} value={quota.value}>
                  {quota.label}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {isVbankDueRequired && (
          <FormControl direction="column">
            <FormLabel>입금기한</FormLabel>
            <Input
              id="vbank_due"
              size="lg"
              type="number"
              {...register("vbank_due")}
            />
          </FormControl>
        )}
        {isBizNumRequired && (
          <FormControl direction="column">
            <FormLabel>사업자번호</FormLabel>
            <Input
              id="biz_num"
              size="lg"
              type="number"
              {...register("biz_num")}
            />
          </FormControl>
        )}
        {isDigitalRequired && (
          <FormControl alignItems="center">
            <FormLabel>실물여부</FormLabel>
            <Switch id="digital" size="lg" {...register("digital")} />
          </FormControl>
        )}
        <FormControl alignItems="center">
          <FormLabel>에스크로</FormLabel>
          <Switch id="escrow" size="lg" {...register("escrow")} />
        </FormControl>
        <FormControl direction="column">
          <FormLabel>주문명</FormLabel>
          <Input
            id="name"
            size="lg"
            defaultValue="아임포트 결제 데이터 분석"
            {...register("name")}
          />
        </FormControl>
        <FormControl direction="column">
          <FormLabel>결제금액</FormLabel>
          <Input
            id="amount"
            size="lg"
            defaultValue="100"
            type="number"
            {...register("amount")}
          />
        </FormControl>
        <FormControl direction="column">
          <FormLabel>주문번호</FormLabel>
          <Input
            id="merchant_uid"
            size="lg"
            defaultValue={`min_${new Date().getTime()}`}
            {...register("merchant_uid")}
          />
        </FormControl>
        <FormControl direction="column">
          <FormLabel>이름</FormLabel>
          <Input
            id="buyer_name"
            size="lg"
            defaultValue="홍길동"
            {...register("buyer_name")}
          />
        </FormControl>
        <FormControl direction="column">
          <FormLabel>전화번호</FormLabel>
          <Input
            id="buyer_tel"
            size="lg"
            defaultValue="01012341234"
            type="number"
            {...register("buyer_tel")}
          />
        </FormControl>
        <FormControl direction="column">
          <FormLabel>이메일</FormLabel>
          <Input
            id="buyer_email"
            size="lg"
            defaultValue="example@example.com"
            {...register("buyer_email")}
          />
        </FormControl>
        <Button type="submit" colorScheme={"red"} size="lg" w="100%">
          결제하기
        </Button>
      </VStack>
    </Box>
  );
}
