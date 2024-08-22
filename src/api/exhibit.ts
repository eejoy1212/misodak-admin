import { axiosInstance } from "./base";

// 기획전 목록 가져오기
export const getExhibits = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/exhibition/${page}`);
    return data;
  };