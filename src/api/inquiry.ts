import { axiosInstance } from "./base";

// 문의 목록 가져오기
export const getInquiries = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/chat/${page}`);
    return data;
  };