import jwtInstance from "../utils/jsonInterceptor";

//완료
export function payToPortOne(data) {
  return jwtInstance.post(`/payments/pay/`, data);
}
//완료
export function getPaymentsHistory() {
  return jwtInstance.get(`/payments/pay/`);
}
