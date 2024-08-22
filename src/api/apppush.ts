import { axiosInstance } from "./base";

// 앱푸시 목록 가져오기
export const getAppPushs = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/app-push/${page}`);
    return data;
  };