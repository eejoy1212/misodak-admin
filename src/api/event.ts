import { axiosInstance } from "./base";

// 이벤트 목록 가져오기
export const getEvents = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/event/${page}`);
    return data;
  };