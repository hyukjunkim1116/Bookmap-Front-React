import { jwtInstance } from "./utils/jwtInterceptor";
export function payToPortOne(data) {
  return jwtInstance.post(`payments/pay`, data);
}
export function getPaymentsHistory() {
  return jwtInstance.get(`payments/pay`);
}
