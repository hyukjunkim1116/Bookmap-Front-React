import axiosInstance from "../utils/axiosUtils";
export function payToPortOne(data) {
  return axiosInstance.post(`payments/pay`, data);
}
export function getPaymentsHistory() {
  return axiosInstance.get(`payments/pay`);
}
