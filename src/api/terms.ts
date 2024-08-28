import { axiosInstance } from "./base";

// 이용약관 목록 가져오기
export const getTerms = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/terms/${page}`);
    return data;
  };
  // 이용약관 목록 수정하기
export const putEditTerms = async (id:number,content:any) => {
  console.log("id",id)
  console.log("content",content)
  const { data } = await axiosInstance.put(`/v1/admin/terms`,{...content});
  return data;
};