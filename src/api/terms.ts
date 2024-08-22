import { axiosInstance } from "./base";

// 이용약관 목록 가져오기
export const getTerms = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/terms/${page}`);
    return data;
  };