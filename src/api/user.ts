import { axiosInstance } from "./base";

// 유저 목록 가져오기
export const getUsers = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/user/${page}`);
    return data;
  };
  // 유저 목록 서치
export const searchGetUsers = async (page:number,keyword:string) => {
  const { data } = await axiosInstance.get(`/v1/admin/user/search/${page}?keyword=${keyword}`);
  return data;
};
// 유저 활성/비활성화하는 함수
export const putActivateUser = async (id: number) => {
  const { data } = await axiosInstance.put(`/v1/admin/user/activate/${id}`);
  
  return data;
};
// 유저 수정하는 함수
export const putEditUser = async (id:number,
  registerTime:string,
  nickname:string,
  phone:string,
  email:string,
  activated:boolean,
  memo:string,) => {
  const { data } = await axiosInstance.put(`/v1/admin/user`,{id,registerTime,nickname,phone,email,activated,memo});
  
  return data;
};
// 유저 삭제
export const deleteUser = async (userId:number,masterPassword:string) => {
  const { data } = await axiosInstance.post(`/v1/admin/user/delete`,{userId,masterPassword});
  return data;
};