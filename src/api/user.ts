import { axiosInstance } from "./base";

// 유저 목록 가져오기
export const getUsers = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/user/${page}`);
    return data;
  };