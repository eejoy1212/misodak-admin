import { axiosInstance } from "./base";

// 앱푸시 목록 가져오기
export const getAppPushs = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/app-push/${page}`);
    return data;
  };
  // 앱푸시 생성
export const postCreateAppPushs = async (body:any) => {
  const { data } = await axiosInstance.post(`/v1/admin/app-push`,{
    ...body

  });
  return data;
};
  // 앱푸시 완료 / 발송 put
  export const putSendAppPush = async (id:any) => {
    console.log("push send id>>>",id)
    const { data } = await axiosInstance.post(`/v1/admin/app-push/send/${id}`);
    return data;
  };
// 앱푸시 삭제
export const deleteAppPush = async (id:number) => {
  const { data } = await axiosInstance.delete(`/v1/admin/app-push/${id}`);
  return data;
};
// 앱푸시 활성/비활성화하는 함수
export const putActivateAppPush = async (id: number) => {
  const { data } = await axiosInstance.put(`/v1/admin/app-push/activate/${id}`);
  
  return data;
};
  // 앱푸시 검색 가져오기
  export const searchGetAppPushs = async (page:number,keyword:string) => {
    const { data } = await axiosInstance.get(`/v1/admin/app-push/search/${page}?keyword=${keyword}`);
    return data;
  };