import { axiosInstance } from "./base";

// 게시글 목록 가져오기
export const getBoard = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/board/${page}`);
    return data;
  };